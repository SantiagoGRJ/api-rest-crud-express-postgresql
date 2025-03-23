import express from "express"
import { deleteProduct, getAllProducts, getDetailProduct, newProduct, patchUpdateProduct, updateProduct } from "../controllers/product.controller"
import { verifiedFormatId } from "../middlewares/verifiedFormatId.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";



const router = express.Router()


const authMiddlewares = [authMiddleware]
const middlewares = [verifiedFormatId,authMiddleware]
router.get('/',authMiddlewares, getAllProducts)
router.post('/',authMiddlewares, newProduct)
router.get('/:id', middlewares, getDetailProduct)
router.put('/:id', middlewares, updateProduct)
router.patch('/:id',middlewares,patchUpdateProduct)
router.delete('/:id',middlewares,deleteProduct)


export default router
