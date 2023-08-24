import { Router } from "express";
import { uploader } from "../../utils.js";
import ProductsController from "../../controllers/products.js";
import ProductModel from "../../dao/models/product.js";
import CommunsUtil from "../../utils/communs.js";
import { authMiddleware, authentionMiddleware } from "../../utils/index.js";

const router = Router();

router
  .get("/", async (req, res) => {
    const {
      query: { limit = 10, page = 1 },
    } = req;
    const options = {
      limit,
      page,
    };
    const result = await ProductModel.paginate({}, options);
    res.json(CommunsUtil.buidResponse(result));
  })
  .get(
    "/:id",
    authMiddleware("jwt"),
    authentionMiddleware("customer, admin, premium"),
    ProductsController.getById
  )
  .post(
    "/",
    authMiddleware("jwt"),
    authentionMiddleware("admin, premium"),
    uploader.single("thumbnail"),
    ProductsController.create
  )
  .put(
    "/:id",
    authMiddleware("jwt"),
    authentionMiddleware("admin, premium"),
    ProductsController.updateById
  )
  .delete(
    "/:id",
    authMiddleware("jwt"),
    authentionMiddleware("admin, premium"),
    ProductsController.deleteById
  );

export default router;
