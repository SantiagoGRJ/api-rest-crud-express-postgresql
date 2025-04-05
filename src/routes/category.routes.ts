import express from "express"
import { categoryController } from "../controllers/category.controller"
import validateCategoryId from "../middlewares/validateCategoryId.middleware"
import validateCategoryFields from "../middlewares/validateCategoryFields.middleware"
import verifySessionBearer from "../middlewares/verifySessionBearer.middleware"
import verifySessionCookies from "../middlewares/verifySessionCookie.middleware"


const router = express.Router()

const middlewares = [validateCategoryId]

const authMiddlewares = [verifySessionBearer, verifySessionCookies]

router.get('/',authMiddlewares, categoryController.getAllCategories)

router.get('/:id',authMiddlewares, middlewares, categoryController.getCategoryById)

router.post('/',authMiddlewares, validateCategoryFields,  categoryController.createCategory)

router.put('/:id',authMiddlewares, middlewares , validateCategoryFields,categoryController.updateCategory)

router.patch('/:id', authMiddlewares, middlewares, categoryController.patchUpdateCategory)

router.delete('/:id', authMiddlewares, middlewares, categoryController.deleteCategory)

export default router