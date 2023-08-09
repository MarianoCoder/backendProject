import { Router } from "express";

const router = Router();

router.get("/api/users", async (req, res) => {
  const users = await get(req.query);
  res.render("users", { users });
});

export default router;
