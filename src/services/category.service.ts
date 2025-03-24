import db from "../db";
import { ICategory } from "../models/category.model";


class CategoryService {

    async getAllCategories() {
       try {
        return await db.query("SELECT * FROM categories")
       } catch (error) {
        throw error
       }
    }

    async createCategory(category:ICategory){
        try {
           return await db.none("INSERT INTO categories (name,description) VALUES ($1,$2)", [category.name, category.description])
        } catch (error:any) {
            throw new Error(error)
        }
    }

    async updateCategory(id:string,category:ICategory){
      try {
        return await db.none('UPDATE categories SET name=$1 , description=$2 WHERE id=$3',
            [category.name,category.description, id]
        );
      } catch (error:any) {
        throw new Error(error)
      }
    }

    async deleteCategory(id:string){
       try {
        return await db.none('DELETE FROM categories WHERE id=$1', [id])
       } catch (error:any) {
        throw new Error(error)
       }
    }
}
export const categoryService= new CategoryService()