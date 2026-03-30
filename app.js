import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import connectMongoDb from "./db/connectMongoDb.js";
import configurePassportGoogle from "./passport/configurePassportGoogle.js";

connectMongoDb();
configurePassportGoogle();

import uploadBankStatementRouter from "./routes/uploadBankStatementRouter.js";
import authRouter from "./routes/authRouter.js";
import transactionRouter from "./routes/transactionRouter.js";
import dashboardRouter from "./routes/dashboardRouter.js";

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/upload", uploadBankStatementRouter);
app.use("/auth", authRouter);
app.use("/transaction", transactionRouter);
app.use("/dashboard", dashboardRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
