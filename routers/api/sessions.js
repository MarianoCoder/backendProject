import { Router } from "express";
import UserModel from "../../dao/models/user.js";
import { createHash, validatePassword } from "../../utils/index.js";
import passport from "passport"

const router = Router();

router.post("/login", passport.authenticate("login",{ failureRedirect: "/login" }), async (req, res) => {
  console.log("req.user", req.user)
  req.session.user = req.user
  res.redirect("/profile")
});

router.post("/register", passport.authenticate("register",{ failureRedirect: "/register" }), (req, res) => {
  res.redirect("/login")
});

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
    body: { email, password },
  } = req;

  if (!email || !password) {
    return res.render("reset-password", {
      error: "Todo los campos debe venir en la solicitud.",
    });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.render("reset-password", { error: "Email no existe." });
  }

  user.password = createHash(password);

  await UserModel.updateOne({ email }, user); 

  res.redirect("/login");
})
  
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login" }), (req, res) => {
  console.log("req.user", req.user)
  req.session.user = req.user
  res.redirect("/profile")
})


export default router;
