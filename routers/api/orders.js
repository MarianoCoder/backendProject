import { Router } from "express";

import { get, create, resolve } from "../../controllers/orders.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const orders = await get(req.query);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const order = await create(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/resolve", async (req, res, next) => {
  try {
    const order = await resolve(req.params.id, req.body);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

export default router;
