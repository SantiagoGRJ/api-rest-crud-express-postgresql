import express from "express"

import { authController } from "../controllers/auth.controller"
import validateUsersFields from "../middlewares/validateUserFields.middleware"


const router = express.Router()
const middlewares = [validateUsersFields]

router.post('/login',middlewares,authController.login)
router.post('/register',middlewares,authController.register)
router.post('/logout',authController.logOut)




export default router