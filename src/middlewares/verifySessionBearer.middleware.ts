import { NextFunction, Request, Response } from "express"
import { isValidToken } from "../services/jwt.service"


 const verifySessionBearer = (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            //message:"Access denied, Token not provided. "
            success: false, message: "Authentication required. "
        })
        return
    }
    const token = authHeader.split(' ')[1]
    const validToken = isValidToken(token)
    if (validToken.error) {
        res.status(401).json({
          success:false,  message: "Invalid Token or Expired Token"
        })
        return
    }

    next()
}

export default verifySessionBearer