import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const dashboardRouter = Router();

dashboardRouter.use(isLoggedIn);
dashboardRouter.get("/", getDashboard);

export default dashboardRouter;
