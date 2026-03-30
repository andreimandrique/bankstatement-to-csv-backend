import { Router } from "express";
import { getDetail } from "../controllers/detailController.js";

const detailRouter = Router();

detailRouter.get("/", getDetail);

export default detailRouter;
