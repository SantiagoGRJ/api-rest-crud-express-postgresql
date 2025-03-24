import express from "express"
import { limiter } from "./middlewares/limiter.middleware"
import productRoutes from "./routes/product.routes"
import authRoutes from "./routes/auth.routes"
import rolesRoutes from "./routes/role.routes"
import categoryRoutes from "./routes/categories.route"
import cookieparser from "cookie-parser"


const app = express()

app.use(cookieparser())

app.use(limiter)

app.use(express.json())

app.use('/products',productRoutes)
app.use('/category',categoryRoutes)
app.use('/auth',authRoutes)

app.use('/roles',rolesRoutes)
export default app