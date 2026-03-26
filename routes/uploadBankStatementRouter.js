import { Router } from "express";
import multer from "multer";
import verifyToken from "../middlewares/verifyToken.js";
import { postUploadBankStatement } from "../controllers/uploadBankStatementController.js";

const uploadBankStatementRouter = Router();

const multerMemoryStorage = { storage: multer.memoryStorage() };
//const multerDiskStorage = { dest: "./bucket/" };
const upload = multer(multerMemoryStorage);

uploadBankStatementRouter.post(
  "/",
  verifyToken,
  upload.single("file"),
  postUploadBankStatement,
);

export default uploadBankStatementRouter;
