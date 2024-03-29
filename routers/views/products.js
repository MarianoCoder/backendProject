import { Router } from "express";

import CommunsUtil from "../../utils/communs.js";
import ProductModel from "../../dao/models/product.js";

const router = Router();

router.get("/", async (req, res) => {
  const {
    query: { limit = 10, page = 1, sort },
  } = req;
  const options = {
    limit,
    page,
  };
  if (sort) {
    options.sort = { price: sort };
  }
  const result = await ProductModel.paginate({}, options);
  res.render("products", CommunsUtil.buidResponse({ ...result, sort }));
});

export default router;
