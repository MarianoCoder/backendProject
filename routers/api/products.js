import { Router } from "express";

import { uploader } from "../../utils.js";
import ProductsController from "../../controllers/products.js";
import StudentModel from "../../dao/models/product.js";
import CommunsUtil from "../../utils/communs.js";

const router = Router();

router
  //.get("/products", ProductsController.get)
  .get("/", async (req, res) => {
    const {
      query: { limit = 10, page = 1 }
    } = req;
    const options = {
      limit,
      page,
    };
    const result = await StudentModel.paginate({}, options);
    res.json(CommunsUtil.buidResponse(result));
  })
  .post("/", uploader.single("thumbnail"), ProductsController.create)
  .put("/:id", ProductsController.updateById)
  .delete("/:id", ProductsController.deleteById);

export default router;
