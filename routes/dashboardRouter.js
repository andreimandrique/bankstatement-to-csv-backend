import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import isLoggedIn from "../middlewares/isLoggedIn.js";

const dashboardRouter = Router();

dashboardRouter.get("/", isLoggedIn, getDashboard);

export default dashboardRouter;
