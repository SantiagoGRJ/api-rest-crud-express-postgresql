import express from "express"
import { productController } from "../controllers/product.controller";
import validateProductId from "../middlewares/validateProductId.middleware";
import verifySessionBearer from "../middlewares/verifySessionBearer.middleware";
import verifySessionCookies from "../middlewares/verifySessionCookie.middleware";
import validateProductFields from "../middlewares/validateProductFields.middleware";


const router = express.Router()


const authMiddlewares = [verifySessionBearer, verifySessionCookies]

const middlewares = [validateProductId]

router.get('/',authMiddlewares, productController.getAllProducts)

router.post('/',authMiddlewares,validateProductFields, productController.createProduct)

router.get('/:id',authMiddlewares, middlewares, productController.getProductById)

router.put('/:id',authMiddlewares,validateProductFields, middlewares, productController.updateProduct)

router.patch('/:id',authMiddlewares, middlewares,productController.patchUpdateProduct)

router.delete('/:id',authMiddlewares,middlewares,productController.deleteProduct)


export default router
