import { Router } from "express";
import { getDetail } from "../controllers/detailController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const detailRouter = Router();

detailRouter.use(isLoggedIn);
detailRouter.get("/", getDetail);

export default detailRouter;
