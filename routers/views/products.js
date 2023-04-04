import { Router } from "express";

import CommunsUtil from "../../utils/communs.js";
import ProductModel from "../../dao/models/product.js";

const router = Router();

/*router.get("/", (req, res) => {
  const products = [
    {
      title: "Patricio",
      description: "Estrella",
      code: "25",
      price: "33258968",
      stock: "Programacion",
      category: "10",
    },
  ];
  res.render("products", { products });
});*/

router.get("/", async (req, res) => {
  const {
    query: { limit = 10, page = 1, sort }
  } = req;
  const options = {
    limit,
    page,
  };
  if (sort) {
    options.sort = { price: sort };
  }
  const result = await ProductModel.paginate({}, options);
  res.render("products", CommunsUtil.buidResponse({ ...result , sort}));
});

export default router;
