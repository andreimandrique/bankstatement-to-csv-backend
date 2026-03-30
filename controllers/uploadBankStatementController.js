import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../utils/s3.js";
import celeryClient from "../utils/celeryClient.js";
import Transaction from "../models/Transaction.js";

const postUploadBankStatement = async (req, res) => {
  if (!req.file) {
    return res.render("dashboard", { error: "No file" });
  }

  if (req.file.mimetype !== "application/pdf") {
    return res.render("dashboard", { error: "File is must be pdf" });
  }

  const MAX_SIZE = 8 * 1024 * 1024;

  if (req.file.size > MAX_SIZE) {
    return res.render("dashboard", { error: "File is too large" });
  }

  const uniqueNameId = uuidv4();
  const myFolder = "bankstatement-pdf";
  const myBucket = "my-bucket";
  const myKey = `${myFolder}/${uniqueNameId}.pdf`;

  await Transaction.findOneAndUpdate(
    { google_id: req.user.sub },
    {
      bankstatement_pdf: `${uniqueNameId}.pdf`,
      bankstatement_csv: `${uniqueNameId}.csv`,
    },
    { upsert: true, returnDocument: true },
  );

  await s3.send(
    new PutObjectCommand({
      Bucket: myBucket,
      Key: myKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }),
  );

  await celeryClient.sendTask("tasks.add", [], {
    fileBucket: myBucket,
    fileKey: myKey,
    fileName: uniqueNameId,
    googleId: req.user.sub,
  });

  res.redirect("/detail");
};

export { postUploadBankStatement };
