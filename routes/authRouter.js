import { Router } from "express";
import passport from "passport";
import {
  postAuthLogin,
  postAuthRegister,
  getAuthLogout,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", postAuthLogin);
authRouter.post("/register", postAuthRegister);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  }),
);

authRouter.get("/logout", getAuthLogout);

export default authRouter;
