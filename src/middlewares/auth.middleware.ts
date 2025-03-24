import { NextFunction, Request, Response } from "express"
import { isValidToken } from "../services/jwt.service"


export const authMiddleware = (req:Request,res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({
            message:"Access denied, Token not provided."
        })
        return
    }
    const token = authHeader?.split(' ')[1]
    const validToken = isValidToken(token)
    if(validToken.error){
        res.status(401).json({
            message:"Invalid Token or Expired Token"
        })
        return
    }
    
    next()
}