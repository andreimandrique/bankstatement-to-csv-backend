import { Router } from "express";
import {
  postTransaction,
  getTransactionUserId,
} from "../controllers/transactionController.js";

const transactionRouter = Router();

transactionRouter.post("/", postTransaction);
transactionRouter.get("/:google_id", getTransactionUserId);

export default transactionRouter;
