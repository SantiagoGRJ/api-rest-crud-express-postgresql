import { Request, Response } from "express"
import { comparePassword, hashPassword } from "../utils/bcryptPassword.util"
import db from "../db"
import { generateToken } from "../services/jwt.service"

import { EnvConfig } from "../env"
import authService from "../services/auth.service"
import { IUser } from "../models/user.model"

class AuthController {

    async login(req: Request, res: Response) {
        const { email, password } = req.body

        try {
            const user: IUser | null = await authService.Login(email)

            if (user === null) {
                res.status(404).json({
                    success: false, message: "Check your email or password"
                })
                return
            }

            const validPassword = await comparePassword(password, user.password)
            if (!validPassword) {
                res.status(404).json({
                    success: false, message: "Check your email or password"
                })
                return
            }
            const token = generateToken(user)
            res.cookie('token', token, {
                httpOnly: true,       // Not accessible via JavaScript
                secure: EnvConfig.NODE_ENV === 'production',         // HTTPS only
                sameSite: 'strict',   // Prevents CSRF
                maxAge: 3600000       // 1 hour expiration
            })
            res.json({ token })
        } catch (error: any) {
            res.status(500).json({
                success: false, message: error.message
            })
        }

    }

    async register(req: Request, res: Response) {
        const { email, name, role, password } = req.body
        let idRole;

        if (role === "admin" || role === "user") {
            idRole = await db.one("SELECT id FROM roles WHERE name=$1", [role])

        } else {
            res.status(500).json({
                message: "Check Field"
            })
            return
        }


        const encryptedPassword = await hashPassword(password)

        const newUser = {
            name: name,
            email: email,
            password: encryptedPassword
        }

        try {

            await authService.Register(newUser, idRole.id)

            res.status(201).json({
                success: true, message: `Created User ${name}`
            })

        } catch (e: any) {
            res.status(500).json({
                success: false, message: e.message
            })
        }



    }
    async logOut(_req: Request, res: Response) {
        try {
            res.clearCookie('token');
            res.status(200).json({
                success: true, message: "Logged out Successfully"
            })
        } catch (error: any) {
            res.status(500).json({
                success: false, message: error.message
            })
        }
    }

}

export const authController = new AuthController()

