import { Router } from "express";
import multer from "multer";
import { postUploadBankStatement } from "../controllers/uploadBankStatementController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const uploadBankStatementRouter = Router();

const multerMemoryStorage = { storage: multer.memoryStorage() };
const multerDiskStorage = { dest: "./bucket/" };
const upload = multer(multerMemoryStorage);

uploadBankStatementRouter.use(isLoggedIn);
uploadBankStatementRouter.post(
  "/",
  upload.single("bankstatement"),
  postUploadBankStatement,
);

export default uploadBankStatementRouter;
