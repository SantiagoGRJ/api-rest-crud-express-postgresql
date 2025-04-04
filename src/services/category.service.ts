
import db from "../db";
import { ICategory } from "../models/category.model";


class CategoryService {

  async getAllCategories() {
    try {
      return await db.query("SELECT * FROM categories")
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error(`Unexpected Error: ${error}`)
      }
    }
  }

  async createCategory(category: ICategory) {
    try {
      
      
       return await db.query(
                        `INSERT INTO categories (name, description) 
                       VALUES ($1, $2)`,
                        [category.name, category.description]
                    );
    } catch (error: unknown) {
      
      
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error(`Unexpected Error: ${error}`)
      }
    }
  }

  async updateCategory(id: string, category: ICategory) {
    try {
      return await db.none('UPDATE categories SET name=$1 , description=$2 WHERE id=$3',
        [category.name, category.description, id]
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error(`Unexpected Error: ${error}`)
      }
    }
  }

  async deleteCategory(id: string) {
    try {
      return await db.none('DELETE FROM categories WHERE id=$1', [id])
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error(`Unexpected Error: ${error}`)
      }
    }
  }
}
export const categoryService = new CategoryService()