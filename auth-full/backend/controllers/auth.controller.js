import z from 'zod';
import {User} from '../models/users.js';
import bcrypt from 'bcryptjs';
import { generateVerificationCode } from '../secure.utils/verification.js';

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
            verificationCodeExpiredAt: Date.now() + 20 * 60 * 1000
        });

        await newUser.save(); // save user

    } catch (error) {
        console.error(`signup error ${error}`);
    }
}

export const login = async (req,res)=>{
    return res.send('login route');
}

export const logout = async (req,res)=>{
    return res.send('logout route');
}