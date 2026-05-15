import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../db/prisma';
import { Request, Response } from 'express';
import { GoogleLoginCredentials } from '../type/type';

export async function register(req: Request, res: Response){
    const {name, email, password} = req.body;
     const hashedPassword = bcryptjs.hashSync(password, 10)

     const existingUser = await prisma.user.findUnique({
        where: {
            email
        }
     })

     if(existingUser){
        return res.status(400).json({error: "User already exists"})
     }

     const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
     })

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: 'JWT_SECRET is not defined in environment variables' });
        }

             const token = jwt.sign({ _id: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });

        const data = {
            user,
            token
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600 * 1000,
        });


     return res.status(201).json({message: "User registered successfully", data})
}

export async function login(req: Request, res: Response){
    const {email, password} = req.body;
    console.log(email, password)
    //  const hashedPassword = bcryptjs.hashSync(password, 10)

     
     const existingUser = await prisma.user.findUnique({
         where: {
             email
            }
        })

     if(!existingUser){
        return res.status(400).json({error: "User does not exist"})
     }

        const isPasswordCorrect = bcryptjs.compareSync(password, existingUser?.password || "");

        if(!isPasswordCorrect){
            return res.status(400).json({error: "Incorrect Password"})
        }

     const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: 'JWT_SECRET is not defined in environment variables' });
        }

        const token = jwt.sign({ _id: existingUser.id, email: existingUser.email }, jwtSecret, { expiresIn: '1h' });

        const data = {
            existingUser,
            token
        }

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600 * 1000,
        });

     return res.status(201).json({message: "User Login successfully", data })
}

export async function googleLogin(req: Request, res: Response) {
    const { name, googleId, email, avatar } = req.body;
    console.log({email, googleId})
    if (!googleId) {
        return res.status(400).json({ error: "Google credential token is required" });
    }

    try {
        // Find existing user or create a new one
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: name || "Google User",
                    email,
                    googleId,
                    password: null,
                    picture: avatar
                },
            });
        } else if (!user.googleId) {
            // Link Google account to existing email-based user
            user = await prisma.user.update({
                where: { email },
                data: { googleId },
            });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
        }

        const token = jwt.sign({ _id: user.id, email: user.email }, jwtSecret, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600 * 1000,
        });

        return res.status(200).json({
            message: "Google login successful",
            data: { user: { id: user.id, name: user.name, email: user.email }, token },
        });
    } catch (error) {
        console.error("Google login error:", error);
        return res.status(401).json({ error: "Google authentication failed" });
    }
}