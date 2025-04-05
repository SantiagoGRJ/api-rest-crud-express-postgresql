import { NextFunction, Request, Response } from "express"
import { IUser } from "../models/user.model"

import isValidFieldsUser from "../utils/validFiledsUsers.util"


const validateUsersFields = async (req:Request,res:Response, next:NextFunction) => {
    let { email, password} : IUser = req.body

    const isValid = isValidFieldsUser.safeParse({
        email:email,
        password:password
    })
    if(!isValid.success){
        res.status(400).json({
            success:false, message: isValid.error.flatten().fieldErrors
        })
    }else{
        next()
    }
}
export default validateUsersFields