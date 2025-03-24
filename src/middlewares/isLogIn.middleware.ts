import { NextFunction, Request, Response } from "express";
import { isValidToken } from "../services/jwt.service";


export const isLogIn = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies
   
    try {
        if (!token) {
            res.status(401).json({
                success: false, message: "Authentication required"
            })
            return
        }

        const validToken = isValidToken(token)
        if (validToken.error) {
            res.clearCookie('token')
            res.status(401).json({
                message: "Invalid Token or Expired Token    "
            })
            return
        }
        next()
    } catch (e:any) {
        res.status(500).json({
            success:false,message:e.message
        })
    }
}