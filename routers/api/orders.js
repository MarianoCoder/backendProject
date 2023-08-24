import { Router } from "express";

import { get, getById, create, resolve } from "../../controllers/orders.js";
import { authMiddleware, authentionMiddleware } from "../../utils/index.js";

const router = Router();

router.get(
  "/",
  authMiddleware("jwt"),
  authentionMiddleware("admin, premium"),
  async (req, res, next) => {
    try {
      const orders = await get(req.query);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  authMiddleware("jwt"),
  authentionMiddleware("customer, admin, premium"),
  async (req, res, next) => {
    try {
      const order = await create(req.body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  authMiddleware("jwt"),
  authentionMiddleware("customer, admin, premium"),
  async (req, res, next) => {
    try {
      const order = await getById(req.params.id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id/resolve",
  authMiddleware("jwt"),
  authentionMiddleware("customer, admin, premium"),
  async (req, res, next) => {
    try {
      const order = await resolve(req.params.id, req.body);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
