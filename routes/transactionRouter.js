import { Router } from "express";
import {
  postTransaction,
  getTransactionUserId,
} from "../controllers/transactionController.js";

const transactionRouter = Router();

transactionRouter.post("/", postTransaction);
transactionRouter.get("/:user_id", getTransactionUserId);

export default transactionRouter;
