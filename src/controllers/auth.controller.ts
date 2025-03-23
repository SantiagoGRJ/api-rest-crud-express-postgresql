import { Request, Response } from "express"
import { comparePassword, hashPassword } from "../utils/bcryptPassword.util"
import db from "../db"
import {  generateToken } from "../services/jwt.service"
import { IUser } from "../lib/definitions"

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email) {
        res.status(400).json({ message: "Email is Empty, check field" })
        return
    }
    
    if (!password) {
        res.status(400).json({ message: "Password is Empty, check field" })
        return
    }
    const user : IUser | null = await db.oneOrNone('SELECT name,email,password FROM users WHERE email=$1',[email])
    
    if(user === null){
        res.status(404).json({
            message:"Check your email or password"
        })
        return
    }
    
    const validPassword = await comparePassword(password, user.password)
    if(!validPassword){
        res.status(404).json({
            message:"Check your email or password"
        })
        return
    }
    const token = generateToken(user)

    res.json({token})
}

export const register = async (req: Request, res: Response): Promise<void> => {
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

    try {

        await db.none("INSERT INTO users (name,email,password,id_role) VALUES ($1,$2,$3,$4)", [name, email, encryptedPassword, idRole.id])
        res.status(201).json({
            message: `Created User ${name}`
        })

    } catch (e:any) {
        if (e.constraint === "users_email_key") {
            res.status(500).json({
                message: `Database Error : Email duplicate Try a different Email!`
            })
            console.log(e);
        }else if(e.constraint === "users_name_key"){
            res.status(500).json({
                message: `Database Error : name duplicate Try a different Name!`
            })
            console.log(e);
        } 
    }



}


