import express from "express"
import { productController } from "../controllers/product.controller";
import { verifiedFormatId } from "../middlewares/verifiedFormatId.middleware";
import { isLogInWithBearer } from "../middlewares/isLoginBearer.middleware";
import { isLogInWithCookies } from "../middlewares/isLogInCookie.middleware";


const router = express.Router()


const authMiddlewares = [isLogInWithBearer, isLogInWithCookies]

const middlewares = [verifiedFormatId]

router.get('/',authMiddlewares, productController.getAllProducts)

router.post('/',authMiddlewares, productController.createProduct)

router.get('/:id',authMiddlewares, middlewares, productController.getProductById)

router.put('/:id',authMiddlewares, middlewares, productController.updateProduct)

router.patch('/:id',authMiddlewares,middlewares,productController.patchUpdateProduct)

router.delete('/:id',authMiddlewares,middlewares,productController.deleteProduct)


export default router
