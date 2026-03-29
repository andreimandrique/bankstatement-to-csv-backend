import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";

import connectMongoDb from "./db/connectMongoDb.js";
import configurePassportGoogle from "./passport/configurePassportGoogle.js";

import uploadBankStatementRouter from "./routes/uploadBankStatementRouter.js";
import authRouter from "./routes/authRouter.js";
import transactionRouter from "./routes/transactionRouter.js";

dotenv.config();
connectMongoDb();
configurePassportGoogle();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use("/upload", uploadBankStatementRouter);
app.use("/auth", authRouter);
app.use("/transaction", transactionRouter);

function isLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }
  //console.log(req.user);
  next();
}

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/",
  }),
);

app.get("/protected", isLoggedIn, (req, res) => {
  res.send("<h1>Protected</h1>");
});

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with google</a>');
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
