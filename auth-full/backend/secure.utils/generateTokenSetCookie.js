import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
config();

export const generateTokenAndSetCookie = (res,userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    // set in coockie
    res.cookie("token", token, {
        httpOnly: true, // cant be accessed by javascript and avoids XSS Attacks
        secure: process.env.NODE_ENV === "production", // which means we have http in dev and https in production
        sameSite: "strict", // prevents csrf attack
        maxAge: 24 * 60 * 60 * 1000
    });

    return token;
};
