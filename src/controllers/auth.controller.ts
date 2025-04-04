import { Request, Response } from "express"
import { comparePassword, hashPassword } from "../utils/bcryptPassword.util"
import db from "../db"
import {  generateToken } from "../services/jwt.service"
import { IUser } from "../lib/definitions"
import { EnvConfig } from "../env"
import authService from "../services/auth.service"

class AuthController {
    
    async login(req: Request, res: Response) {
        const { email, password } = req.body
        if (!email) {
            res.status(400).json({ success:false, message: "Email is Empty, check field" })
            return
        }
        
        if (!password) {
            res.status(400).json({ success: false, message: "Password is Empty, check field" })
            return
        }
        try {
            const user : IUser | null = await authService.Login(email)
        
        if(user === null){
            res.status(404).json({
              success:false,  message:"Check your email or password"
            })
            return
        }
        
        const validPassword = await comparePassword(password, user.password)
        if(!validPassword){
            res.status(404).json({
               success: false, message:"Check your email or password"
            })
            return
        }
        const token = generateToken(user)
        res.cookie('token',token,{
            httpOnly: true,       // Not accessible via JavaScript
            secure: EnvConfig.NODE_ENV === 'production',         // HTTPS only
            sameSite: 'strict',   // Prevents CSRF
            maxAge: 3600000       // 1 hour expiration
        })
        res.json({token})
        } catch (error:any) {
            res.status(500).json({
              success:false,  message: error.message
            })
        }
        
    }

    async register(req: Request, res: Response) {
        const { email, name, role, password } = req.body
        let idRole
    
    
        if (!email) {
            res.status(400).json({ message: "Email is Empty, check field" })
            return
        }
        if (!name) {
            res.status(400).json({ message: "Name is Empty, check field" })
            return
        }
        if (!role) {
            res.status(400).json({ message: "Role is Empty, check field" })
            return
        }
        if (!password) {
            res.status(400).json({ message: "Password is Empty, check field" })
            return
        }
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
            name:name,
            email:email,
            password:encryptedPassword
        }
    
        try {
    
            await authService.Register(newUser,idRole.id)
            
            res.status(201).json({
               success:true, message: `Created User ${name}`
            })
    
        } catch (e:any) {
            if (e.constraint === "users_email_key") {
                res.status(500).json({
                  success:false,  message: `Database Error : Email duplicate Try a different Email!`
                })
                console.log(e);
            }else if(e.constraint === "users_name_key"){
                res.status(500).json({
                   success:false, message: `Database Error : name duplicate Try a different Name!`
                })
                console.log(e);
            } 
        }
    
    
    
    }
    async logOut(_req: Request, res: Response) {
        try{
            res.clearCookie('token');
            res.status(200).json({
                success:true, message:"Logged out Successfully"
            })
        }catch(error:any){
            res.status(500).json({
               success:false, message: error.message
            })
        }
    }
    
}

export const authController = new AuthController()
 
