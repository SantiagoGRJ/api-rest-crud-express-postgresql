import express from "express"
import { categoryController } from "../controllers/categories.controller"
import { verifiedFormatIdCategories } from "../middlewares/verifiedFormatIdCategories.middleware"

const router = express.Router()

const middlewares = [verifiedFormatIdCategories]

router.get('/', categoryController.getAllCategories)

router.get('/:id', middlewares, categoryController.getCategoryById)

router.post('/', categoryController.createCategory)

router.put('/:id',middlewares,categoryController.updateCategory)

router.patch('/:id',middlewares, categoryController.patchUpdateCategory)

router.delete('/:id', middlewares, categoryController.deleteCategory)

export default router