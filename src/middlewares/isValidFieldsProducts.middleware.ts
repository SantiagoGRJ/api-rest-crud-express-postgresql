import { Request, Response, NextFunction } from "express";
import isValidFildsProducts from "../utils/validFields.utils";
import { IProduct } from "../models/product.model";


const checkFieldsProduct = async (req: Request, res: Response, next: NextFunction) => {
    let { name, description, category, price, stock, url_img }: IProduct = req.body
    const isValid = isValidFildsProducts.safeParse({
        name: name,
        description: description,
        category: category,
        price: price,
        stock: stock,
        url_img: url_img

    })

    if (!isValid.success) {
       res.status(400).json({
            errors: isValid.error.flatten().fieldErrors
        })
        return
    } else {
        next()
    }
}


export default checkFieldsProduct