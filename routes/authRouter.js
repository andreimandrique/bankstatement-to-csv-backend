import { Router } from "express";
import {
  postAuthLogin,
  postAuthRegister,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/login", postAuthLogin);
authRouter.post("/register", postAuthRegister);

export default authRouter;
