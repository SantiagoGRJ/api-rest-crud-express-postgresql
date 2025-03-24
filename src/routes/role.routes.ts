import express from "express"
import { roleController } from "../controllers/role.controller"

const router = express.Router()

router.get('/',roleController.getAllCategories)

export default router