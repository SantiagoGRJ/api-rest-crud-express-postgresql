import { Request, Response } from "express";
import db from "../db";


export const getAllCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await db.any("SELECT * FROM categories")
        if (categories.length === 0) {
            res.status(200).json([])
            return
        }
        res.json(categories)
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}
export const getDetailsCategory = async (_req: Request, res: Response) => {
    const category = res.locals.category
    res.json(category)
}
export const newCategory = async (req: Request, res: Response) => {
    const { name, description } = req.body
    if (!name) {
        res.status(400).json({
            message: 'Error, Check Field Name'
        })
        return
    }
    if (!description) {
        res.status(400).json({
            message: 'Error, Check Field description'
        })
        return
    }
    const newCategory = {
        name: name,
        description: description
    }
    try {
        await db.none("INSERT INTO categories (name,description) VALUES ($1,$2)", [newCategory.name, newCategory.description])
        res.status(201).json({
            message:`Category Created Called is ${newCategory.name}`
        })
    } catch (e:any) {
        if (e.constraint === "categories_name_key") {
            res.status(500).json({
                message: `Database Error : Category duplicate Try a Different Category!`
            })
            return
            
        }else if(e.constraint === "categories_description_key"){
            res.status(500).json({
                message: `Database Error : Description duplicate Try a different Description to Category!`
            })
            return
           
        } 
    }
}

export const updateCategory = async (req: Request, res: Response) => {
   const { name, description } = req.body
       const { id } = req.params
    if (!name) {
        res.status(400).json({
            message: 'Error, Check Field Name'
        })
        return
    }
    if (!description) {
        res.status(400).json({
            message: 'Error, Check Field description'
        })
        return
    }
    try {
         await db.none('UPDATE categories SET name=$1 , description=$2 WHERE id=$6',
            [name, description, id]
        );
        res.status(201).json([])
    } catch (error: any) {
        res.status(500).json({
            message:error.message
        })
    }
}
export const patchCategory = async (req: Request, res: Response) => {
     let { name, description } = req.body
        let category = res.locals.category
        const { id } = req.params
        name ??= category.name
        description ??= category.description

        try {
            await db.none('UPDATE products SET name=$1 , description=$2 WHERE id=$3',
                [name, description, id]
            );
            res.status(201).json([])
        } catch (error: any) {
            res.status(500).json({
                message:error.message
            })
        }
}

export const deleteCategory =  async (req:Request, res:Response) => {
    let { id } = req.params
    try {
         await db.none('DELETE FROM categories WHERE id=$1',[id])
        res.status(200).json({
            message:`Category deleted successfully`
        })
    } catch (error: any) {
        res.status(500).json({
            message:error.message
        })
    }
}