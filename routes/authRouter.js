import { Router } from "express";
import passport from "passport";
import { getAuthLogout } from "../controllers/authController.js";

const authRouter = Router();

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
