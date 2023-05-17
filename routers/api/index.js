import { Router } from 'express'
import users from "./users.js"
import orders from "./orders.js"
import business from "./business.js"

import routerProducts from './products.js'

const router = Router()


router.use('/products', routerProducts)

router.use("/users", users)
router.use("/orders", orders)
router.use("/business", business)



export default router