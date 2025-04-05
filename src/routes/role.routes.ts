import express from "express"
import { roleController } from "../controllers/role.controller"
import verifySessionBearer from "../middlewares/verifySessionBearer.middleware"
import verifySessionCookies from "../middlewares/verifySessionCookie.middleware"

const router = express.Router()

const authMiddlewares = [verifySessionBearer, verifySessionCookies]

router.get('/',authMiddlewares,roleController.getAllCategories)

export default router