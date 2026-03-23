import { Router } from "express";
import multer from "multer";
import { postUploadBankStatement } from "../controllers/uploadBankStatementController.js";

const uploadBankStatementRouter = Router();

const multerMemoryStorage = { storage: multer.memoryStorage() };
const multerDiskStorage = { dest: "./bucket/" };
const upload = multer(multerDiskStorage);

uploadBankStatementRouter.post(
  "/",
  upload.single("file"),
  postUploadBankStatement,
);

export default uploadBankStatementRouter;
