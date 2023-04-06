import { Router } from "express";

import productsViewRoutes from "./views/products.js";
import productsApiRoutes from "./api/products.js";
import sessionsApiRouter from "./api/sessions.js";
import sessionsViewsRouter from "./views/sessions.js"

const router = Router();

router.use("/api/products", productsApiRoutes);
router.use("/products", productsViewRoutes);
router.use("/api/sessions", sessionsApiRouter);
router.use("/", sessionsViewsRouter);

export default router;
