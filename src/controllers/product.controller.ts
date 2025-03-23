import { Request, Response } from "express";
import db from "../db";
import  { TProduct } from "../lib/definitions";





export const getAllProducts = async (_req: Request, res: Response) => {

    try {
        const data  = await db.query<TProduct[]>('SELECT * FROM products');
        if (data.length === 0) {
            res.status(204).json([])
            return
        }

        res.json(data)
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getDetailProduct = async (req:Request, res: Response) => {
    const { id }  = req.params

   try {
    const product = await db.query<TProduct>('SELECT * FROM products WHERE id=$1 LIMIT 1',[id])
    
    res.json(product)
   } catch (error : any) {
    res.status(500).json({
        message:error.message
    })
   }

     

}

export const newProduct = async (req: Request, res: Response) => {
    const { name, description, price, stock, category } : TProduct = req.body
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
    if (!price) {
        res.status(400).json({
            message: 'Error, Check Field Price'
        })
        return
    }
    if (!stock) {
        res.status(400).json({
            message: 'Error, Check Field Stock'
        })
        return
    }
    if (!category) {
        res.status(400).json({
            message: 'Error, Check Field Category'
        })
        return
    }
    try {
        const obj  = {
            name: name,
            description: description,
            price: price ,
            stock: stock,
            category: category
        };

        await db.query(
            `INSERT INTO products (name, description, price, stock, category) 
           VALUES ($1, $2, $3, $4, $5)`,
            [obj.name, obj.description, obj.price, obj.stock, obj.category]
        );

        res.status(201).json({
            message: `Product Created ${obj.name}`
        })
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { name, description, price, stock, category } : TProduct = req.body
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
    if (!price) {
        res.status(400).json({
            message: 'Error, Check Field Price'
        })
        return
    }
    if (!stock) {
        res.status(400).json({
            message: 'Error, Check Field Stock'
        })
        return
    }
    if (!category) {
        res.status(400).json({
            message: 'Error, Check Field Category'
        })
        return
    }


    try {
        const updateProduct = await db.query<TProduct>('UPDATE products SET name=$1 , description=$2, price=$3, stock=$4, category=$5 WHERE id=$6',
            [name, description, price, stock, category, id]
        );
        res.status(201).json(updateProduct)
    } catch (error: any) {
        res.status(500).json({
            message:error.message
        })
    }

}
export const patchUpdateProduct = async (req: Request, res: Response) => {
    let { name, description, price, stock, category } : TProduct = req.body
    let product = res.locals.product
    const { id } = req.params
    name ??= product.name;
    description ??= product.description;
    price ??= product.price;
    stock ??= product.stock;
    category ??= product.category;


    try {
        const updateProduct = await db.query<TProduct>('UPDATE products SET name=$1 , description=$2, price=$3, stock=$4, category=$5 WHERE id=$6',
            [name, description, price, stock, category, id]
        );
        res.status(201).json(updateProduct)
    } catch (error: any) {
        res.status(500).json({
            message:error.message
        })
    }

}

export const deleteProduct = async (req:Request, res:Response) => {
    let { id } = req.params
    try {
         await db.query('DELETE FROM products WHERE id=$1',[id])
        res.status(200).json({
            message:`Product deleted successfully`
        })
    } catch (error: any) {
        res.status(500).json({
            message:error.message
        })
    }
}
