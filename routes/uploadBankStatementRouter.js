import { Router } from 'express';
import { postUploadBankStatement } from '../controllers/uploadBankStatementController';

const uploadBankStatementRouter = Router();

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

uploadBankStatementRouter.post('/', upload.single('file'), postUploadBankStatement);

export default uploadBankStatementRouter;
