import { NextFunction, Request, Response } from "express"
import { valitedToken } from "../services/jwt.service"


export const authMiddleware = (req:Request,res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({
            message:"Access denied, Token not provided."
        })
        return
    }
    const token = authHeader?.split(' ')[1]
    const isValidtoken = valitedToken(token)
    if(isValidtoken.error){
        res.status(401).json({
            message:"Invalid Token or Expired Token"
        })
        return
    }
    next()
}