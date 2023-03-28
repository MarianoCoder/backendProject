import { Router } from "express";

import { uploader } from "../../utils.js";
import ProductsController from "../../contollers/products.js";

const router = Router();

router
  .get("/", ProductsController.get)
  .post("/", uploader.single("thumbnail"), ProductsController.create)
  .put("/:id", ProductsController.updateById)
  .delete("/:id", ProductsController.deleteById);

export default router;
