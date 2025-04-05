import { Request, Response } from "express";
import db from "../db";

import { productService } from "../services/product.service";
import { IProduct } from "../models/product.model";

class ProductController {
    async getAllProducts(_req: Request, res: Response) {
        try {
            const products = await productService.getAllProducts();
            if (products.length === 0) {
                res.status(204).json([])
                return
            }
            res.json(products)
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }
    async getProductById (_req: Request, res: Response) {
        const product = res.locals.product
        try {
            res.json(product)
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }
    async createProduct(req: Request, res: Response) {
        const { name, description, price, stock, category }: IProduct = req.body
        
        try {
            const product = {
                name: name,
                description: description,
                price: price,
                stock: stock,
                category: category
            }
    
            await productService.createProduct(product)
    
            res.status(201).json({
                success: true, message: ` Created ${product.name}`
            })
        } catch (error: any) {
            res.status(500).json({
                success: false, message: error.message
            })
            return
        }
    }
    async updateProduct(req: Request, res: Response) {
        const { name, description, price, stock, category }: IProduct = req.body
        const { id } = req.params
    
        try {
            const product = {
                name: name,
                description: description,
                price: price,
                stock: stock,
                category: category
            }
            const updateProduct = await productService.updateProduct(id, product)
            res.status(201).json({
                success: true, message: `Produc Updated ${updateProduct}`
            })
        } catch (error: any) {
            res.status(500).json({
                success: false, message: error.message
            })
        }
    
    }
    async patchUpdateProduct (req: Request, res: Response) {
        let { name, description, price, stock, category }: IProduct = req.body
        let product = res.locals.product
        
        const { id } = req.params
        name ??= product.name;
        description ??= product.description;
        price ??= product.price;
        stock ??= product.stock;
        category ??= product.category;
    
    
        try {
            const updateProduct = await db.query('UPDATE products SET name=$1 , description=$2, price=$3, stock=$4, category=$5 WHERE id=$6',
                [name, description, price, stock, category, id]
            );
            res.status(201).json(updateProduct)
        } catch (error: any) {
            res.status(500).json({
              success:false,  message: error.message
            })
        }
    
    }
    async deleteProduct(req: Request, res: Response) {
        let { id } = req.params
        try {
            await productService.deleteProduct(id)
            res.status(200).json({
                message: `Product deleted successfully`
            })
        } catch (error: any) {
            res.status(500).json({
              success:false,  message: error.message
            })
        }
    }
}
export const productController = new ProductController()











