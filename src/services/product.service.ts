import db from "../db";
import { IProduct } from "../models/product.model";


class ProductService {

    async getAllProducts() {
        try{
            return await db.any("SELECT * FROM products")
        }catch(error:unknown){
            if(error instanceof Error){
                console.error("Error Fetching users:",error.message);
                throw new Error(error.message)
            }else{
                throw new Error(`Unexpected Error: ${error}`)
            }
        
        }
    }
    async createProduct(product:IProduct){
        try {
           return await db.query(
                `INSERT INTO products (name, description, price, stock, category) 
               VALUES ($1, $2, $3, $4, $5)`,
                [product.name, product.description, product.price, product.stock, product.category]
            );
        } catch (error:unknown) {
            if(error instanceof Error){
                throw new Error(error.message)
            }else{
                throw new Error(`Unexpected Error: ${error}`)
            }
        }
    }
    async updateProduct(id: string,product:IProduct){
        try {
           return await db.one('UPDATE products SET name=$1 , description=$2, price=$3, stock=$4, category=$5 WHERE id=$6',
                [product.name, product.description, product.price, product.stock, product.category, id]
            );
        } catch (error:unknown) {
            if(error instanceof Error){
                throw new Error(error.message)
            }else{
                throw new Error(`Unexpected Error: ${error}`)
            }
        }
    }
    async deleteProduct(id:string){
        try {
            const result = await db.result('DELETE FROM products WHERE id=$1', [id])
            return result.rowCount > 0
        } catch (error:unknown) {
            if(error instanceof Error){
                throw new Error(error.message)
            }else{
                throw new Error(`Unexpected Error: ${error}`)
            }
        }
    }
}
export const productService= new ProductService()