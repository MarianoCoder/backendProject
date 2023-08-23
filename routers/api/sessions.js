import { Router } from "express";
import UserModel from "../../dao/models/user.js";
import {
  createHash,
  validatePassword,
  tokenGenerator,
  isValidToken,
  authMiddleware,
  authentionMiddleware,
} from "../../utils/index.js";
import passport from "passport";
import EmailService from "../../services/email.service.js";
const router = Router();

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log("req.user", req.user);
    req.session.user = req.user;
    res.redirect("/profile");
  }
);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/register" }),
  (req, res) => {
    res.redirect("/login");
  }
);

router.get(
  "/private",
  authMiddleware("jwt"),
  authentionMiddleware("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "this is a private route",
      user: req.user,
    });
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) {
      res.redirect("/login");
    } else {
      res.send({ status: "Logout Error", body: error });
    }
  });
});

router.post("/reset-password", async (req, res) => {
  const {
    body: { email },
  } = req;

  if (!email) {
    return res.render("reset-password", {
      error: "Todo los campos debe venir en la solicitud.",
    });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.render("reset-password", { error: "Email no existe." });
  }

  //user.password = createHash(password);

  //await UserModel.updateOne({ email }, user);

  const token = tokenGenerator(user, "1h");

  console.log("token", token);

  EmailService.sendEmail(
    email,
    "Reset Password",
    `<a href="http://localhost:3000/change-password?token=${token}">Reset Password</a>`
  );

  res.redirect("/login");
});

router.post("/change-password", async (req, res) => {
  const {
    query: { token },
    body: { newPassword, repiteNewPassword },
  } = req;

  if (newPassword !== repiteNewPassword) {
    return res.render("change-password", {
      error: "Las contraseñas no coinciden",
    });
  }
  if (!token) {
    return res.render("change-password", { error: "Token no existe" });
  }
  const payload = await isValidToken(token);
  if (!payload) {
    return res.render("change-password", { error: "Token no existe" });
  }
  const { id } = payload;

  const user = await UserModel.findById(id);

  if (!user) {
    return res.render("change-password", { error: "Usuario no existe" });
  }

  user.password = createHash(newPassword);
  await UserModel.updateOne({ _id: id }, user);
  res.redirect("/login");
});

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    console.log("req.user", req.user);
    req.session.user = req.user;
    res.redirect("/profile");
  }
);

export default router;
