import { Request, Response } from "express";
import db from "../db";
import { categoryService } from "../services/category.service";
import { ICategory } from "../models/category.model";

class CategoryController {
    
    async getAllCategories (_req: Request, res: Response) {
        try {
            const categories = await categoryService.getAllCategories()
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

    async getCategoryById(_req: Request, res: Response) {
        const category = res.locals.category
        res.json(category)
    }

    async createCategory(req: Request, res: Response) {
        let { name, description } : ICategory = req.body
        
        
        
        try {
            let newCategory = {
                name: name,
                description: description
            }
           
            
           
            await categoryService.createCategory(newCategory)
            
            res.status(201).json({
               success:true, message: `Category Created Called is ${newCategory.name}`
            })
        } catch (e: any) {
            if (e.constraint === "categories_name_key") {
                res.status(500).json({
                    message: `Database Error : Category duplicate Try a Different Category!`
                })
                return
    
            } else if (e.constraint === "categories_description_key") {
                res.status(500).json({
                    message: `Database Error : Description duplicate Try a different Description to Category!`
                })
                return
    
            }
        }
    }

    async updateCategory(req: Request, res: Response) {
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
        const updateCategory = {
            name: name,
            description: description
        }
        try {
            await categoryService.updateCategory(id,updateCategory)
            res.status(201).json([])
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    async patchUpdateCategory (req: Request, res: Response) {
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
                message: error.message
            })
        }
    }

    async deleteCategory (req: Request, res: Response) {
        let { id } = req.params
        try {
            await categoryService.deleteCategory(id)
            res.status(200).json({
               success:true, message: `Category deleted successfully`
            })
        } catch (error: any) {
            res.status(500).json({
              success:false,  message: error.message
            })
        }
    }
    
}
export const categoryController = new CategoryController()


