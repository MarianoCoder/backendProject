import { Router } from "express";

import CommunsUtil from "../../utils/communs.js";
import CartModel from "../../dao/models/cart.js";

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
  const result = await CartModel.paginate({}, options);
  res.render("carts", CommunsUtil.buidResponse({ ...result, sort }));
});

export default router;
