import { Router } from "express";

import productsViewRoutes from "./views/products.js";
import productsApiRoutes from "./api/products.js";

const router = Router();

router.use("/api/products", productsApiRoutes);
router.use("/products", productsViewRoutes);

export default router;
