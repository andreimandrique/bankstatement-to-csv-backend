import { Router } from "express";
import { getDownloadBankStatement } from "../controllers/downloadBankStatementController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const downloadBankStatementRouter = Router();

downloadBankStatementRouter.use(isLoggedIn);
downloadBankStatementRouter.get("/", getDownloadBankStatement);

export default downloadBankStatementRouter;
