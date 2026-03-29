import express from "express";

import connectMongoDb from "./db/connectMongoDb.js";

import uploadBankStatementRouter from "./routes/uploadBankStatementRouter.js";
import authRouter from "./routes/authRouter.js";
import transactionRouter from "./routes/transactionRouter.js";

connectMongoDb();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/upload", uploadBankStatementRouter);
app.use("/auth", authRouter);
app.use("/transaction", transactionRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
