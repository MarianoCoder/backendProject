import { Router } from "express";

import productsViewRoutes from "./views/products.js";
import sessionsViewsRouter from "./views/sessions.js";
import productsApiRoutes from "./api/products.js";
import sessionsApiRouter from "./api/sessions.js";
import cartsViewsRouter from "./views/carts.js";
import cartsApiRouter from "./api/carts.js";

const router = Router();

router.use("/api/products", productsApiRoutes);
router.use("/products", productsViewRoutes);
router.use("/api/sessions", sessionsApiRouter);
router.use("/", sessionsViewsRouter);
router.use("/api/carts", cartsApiRouter);
router.use("/carts", cartsViewsRouter);

export default router;
