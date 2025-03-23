import express from "express"
import { deleteCategory, getAllCategories, getDetailsCategory, newCategory } from "../controllers/categories.controller"
import { verifiedFormatIdCategories } from "../middlewares/verifiedFormatIdCategories.middleware"

const router = express.Router()

const middlewares = [verifiedFormatIdCategories]
router.get('/',getAllCategories)
router.get('/:id',middlewares,getDetailsCategory)
router.post('/',newCategory)
router.delete('/:id',middlewares,deleteCategory)
export default router