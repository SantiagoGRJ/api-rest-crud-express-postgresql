import { NextFunction, Request, Response } from "express"
import isValidFieldsCategories from "../utils/validFieldsCategories.utils"


const validateCategoryFields = async (req: Request, res: Response, next: NextFunction) => {
    let { name, description } = req.body
    const isValid = isValidFieldsCategories.safeParse({
        name: name,
        description: description
    })
    if (!isValid.success) {
        res.status(400).json({
            errors: isValid.error.flatten().fieldErrors
        })
        return
    }else{
        next()
    }
}

export default validateCategoryFields