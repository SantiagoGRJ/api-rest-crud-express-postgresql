import express from "express"
import { deleteProduct, getAllProducts, getDetailProduct, newProduct, patchUpdateProduct, updateProduct } from "../controllers/product.controller"
import { verifiedFormatId } from "../middlewares/verifiedFormatId.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isLogIn } from "../middlewares/isLogIn.middleware";



const router = express.Router()


const authMiddlewares = [authMiddleware,isLogIn]

const middlewares = [verifiedFormatId]

router.get('/',authMiddlewares, getAllProducts)

router.post('/',authMiddlewares, newProduct)

router.get('/:id',authMiddlewares, middlewares, getDetailProduct)

router.put('/:id',authMiddlewares, middlewares, updateProduct)

router.patch('/:id',authMiddlewares,middlewares,patchUpdateProduct)

router.delete('/:id',authMiddlewares,middlewares,deleteProduct)


export default router
