import express from "express"
import { login, logOut, register } from "../controllers/auth.controller"


const router = express.Router()

router.post('/login',login)

router.post('/register',register)
router.post('/logout',logOut)




export default router