import db from "../db";
import { TProduct } from "../models/product.model";


class ProductService {

    async getAllProducts() {
        try{
            return await db.any("SELECT * FROM products")
        }catch(e:any){
            console.error("Error Fetching users:",e.message);
        
        }
    }
    async createProduct(product:TProduct){
        try {
           return await db.one(
                `INSERT INTO products (name, description, price, stock, category) 
               VALUES ($1, $2, $3, $4, $5)`,
                [product.name, product.description, product.price, product.stock, product.category]
            );
        } catch (error) {
            throw error;
        }
    }
    async updateProduct(id: string,product:TProduct){
        try {
           return await db.one('UPDATE products SET name=$1 , description=$2, price=$3, stock=$4, category=$5 WHERE id=$6',
                [product.name, product.description, product.price, product.stock, product.category, id]
            );
        } catch (error) {
            throw error
        }
    }
    async deleteProduct(id:string){
        try {
            const result = await db.result('DELETE FROM products WHERE id=$1', [id])
            return result.rowCount > 0
        } catch (error) {
            throw error
        }
    }
}
export const productService= new ProductService()