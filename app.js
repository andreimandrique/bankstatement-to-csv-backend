import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";

import connectMongoDb from "./db/connectMongoDb.js";
import configurePassport from "./passport/configurePassport.js";

import uploadBankStatementRouter from "./routes/uploadBankStatementRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();
connectMongoDb();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/upload", uploadBankStatementRouter);
app.use("/users", userRouter);

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "login" });
});

app.get("/protect", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ message: "welcome" });
  }
  res.json({ message: "you have no access" });
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: "user log out" });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
