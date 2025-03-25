import { Request, Response, NextFunction } from "express"
import db from "../db"
import { validate as uuidValidate } from 'uuid';

export const verifiedFormatIdCategories = async (req: Request, res: Response, next: NextFunction) => {
    let { id } = req.params
    
    if (!uuidValidate(id)) {
        res.status(400).json({
          success:false,  message: "Invalid Id Format"
        })
        return
    } else {
        
        const category = await db.one('SELECT * FROM categories WHERE id=$1 ', id)
        if (category.length === 0) {
            res.status(404).json({
               success:false, message: "Verified the Id"
            })
            return
        } else {
            res.locals.category= category
            next()
        }

    }
}

