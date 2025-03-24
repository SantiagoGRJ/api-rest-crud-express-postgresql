import express from "express"
import { productController } from "../controllers/product.controller";
import { verifiedFormatId } from "../middlewares/verifiedFormatId.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isLogIn } from "../middlewares/isLogIn.middleware";



const router = express.Router()


const authMiddlewares = [authMiddleware,isLogIn]

const middlewares = [verifiedFormatId]

router.get('/',authMiddlewares, productController.getAllProducts)

router.post('/',authMiddlewares, productController.createProduct)

router.get('/:id',authMiddlewares, middlewares, productController.getProductById)

router.put('/:id',authMiddlewares, middlewares, productController.updateProduct)

router.patch('/:id',authMiddlewares,middlewares,productController.patchUpdateProduct)

router.delete('/:id',authMiddlewares,middlewares,productController.deleteProduct)


export default router
