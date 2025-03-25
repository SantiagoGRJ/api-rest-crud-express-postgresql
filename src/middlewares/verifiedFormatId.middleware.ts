import { Request, Response, NextFunction } from "express"
import db from "../db"
import { validate as uuidValidate } from 'uuid';

export const verifiedFormatId = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params
    
    if (!uuidValidate(id)) {
        res.status(400).json({
           success: false, message: "Invalid Id Format"
        })
        return
    } else {
        
        const product = await db.one('SELECT * FROM products WHERE id=$1 ', id)
        if (product.length === 0) {
            res.status(404).json({
              success:false,  message: "Verified the Id"
            })
            return
        } else {
            res.locals.product= product
            next()
        }

    }
}

