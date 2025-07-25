import z, { success } from 'zod';
import {User} from '../models/users.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { generateVerificationCode } from '../secure.utils/verification.js';
import { generateTokenAndSetCookie } from '../secure.utils/generateTokenSetCookie.js';
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';

function checkSignUpUser(email,password,name) 
{
    const user =  z.object({
        email: z.email().nonempty("Email is required"),
        password: z.string().min(6).regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
            "Password must include uppercase, lowercase, number, and special character"
        ).nonempty("Password is required"),
        name:z.string().min(3).nonempty("Name is required")
    });   

    const response = user.safeParse({email:email, password:password, name:name});

    return response.success;
}

export const verifyEmail = async (req,res) => {
    const {code} = req.body;
    try {
        const user  = await User.findOne({
            verificationCode: code,
            verificationCodeExpiredAt: {$gt: Date.now()}
        });
        console.log(user)
        if(!user)
        {
            return res.status(404).json({sucess:false, msg:'Invalid or expired token'});
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpiredAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email,user.name);

        return res.status(200).json({sucess:true,msg:"email verified",user:{
            ...user._doc,
            password: undefined
        }});

    } catch (error) {
        console.error(`verification error ${error}`);
    }
}

export const signup = async (req,res)=>{
    const {email,password,name} = req.body;
    try {
        // Validate Input
        if(!checkSignUpUser(email,password,name))
        {
           return res.status(404).json({
                msg: "Wrong Inputs"
           });
        }

        // user already exists
        const userAlreadyExists = await User.findOne({email})
        if(userAlreadyExists) {
            return res.status(404).json({
                msg: "User Already Exists"
            });
        }

        // password hash
        const hashedPassword = await bcrypt.hash(password,11);
        // verification token
        const verificationCode = generateVerificationCode();

        // creating new user
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            verificationCode,
            verificationCodeExpiredAt: new Date(Date.now() + 20 * 60 * 1000)
        });

        await newUser.save(); // save user

        // jwt
        generateTokenAndSetCookie(res,newUser._id)

        // send verification code 
        await sendVerificationEmail(newUser.email,verificationCode);

        // return 
        return res.status(200).json({
            success: true,
            msg: "User created sucessfully",
            user: {
                ...newUser._doc,
                password: undefined
            }
        })

    } catch (error) {
        console.error(`signup error ${error}`);
    }
}

export const login = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = User.findOne({email});
        if(!user)
        {
            return res.status(404).json({sucess:false, msg: "User not registered"});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid)
        {
            return res.status(404).json({sucess:false, msg: "Invalid password"});
        }
        await generateTokenAndSetCookie(res, user._id);
        user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});

    } catch (error) {
        console.log(`login error ${error}`)
    }
}

export const logout = async (req,res)=>{
    res.clearCookie("token");
    return res.status(200).json({sucess:true, msg:"user loged out sucessfully"});
}

export const forgotPassword = async (req,res)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({sucess:false, msg: "User not found"});
        }
        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpiredAt = new Date(Date.now() + 1*60*60*1000);

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpiredAt = resetPasswordExpiredAt;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

        return res.status(200).json({success:true, msg:"Reset Password send sucessfully"});
    } catch (error) {
        console.log(`reset password error ${error}`)
    }
}

export const resetPassword = async (req,res)=>{
    const {token} = req.params;
    const {password} = req.body;
    console.log(token)

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiredAt: { $gt: Date.now() },
        });

        if (!user) 
        {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }

        const hashedPassword = await bcrypt.hash(password, 11);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });

    } catch (error) {
        console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
    }
}

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};