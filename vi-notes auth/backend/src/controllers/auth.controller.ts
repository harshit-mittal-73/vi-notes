import { Request, Response } from 'express';
import userModel from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import tokenBlacklistModel from '../models/blacklist.model';

export interface AuthRequest extends Request {
    user?: any;
}

export const registerUserController = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email, and password"
        });
    }

    const userAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (userAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists for this username or email address"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
};

export const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email or password is missing"
        });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
};

export const logoutUserController = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (token) {
        await tokenBlacklistModel.create({
            token
        });
    }

    res.clearCookie("token");
    return res.status(200).json({
        message: "User logged out successfully"
    });
};