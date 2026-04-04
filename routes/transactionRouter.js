import { Router } from "express";
import {
  postTransaction,
  getTransactionUserId,
} from "../controllers/transactionController.js";
import isLoggedInResponse from "../middlewares/isLoggedInResponse.js";

const transactionRouter = Router();

transactionRouter.post("/", postTransaction);
transactionRouter.get("/:google_id", isLoggedInResponse, getTransactionUserId);

export default transactionRouter;
