import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../utils/s3.js";
import celeryClient from "../utils/celeryClient.js";
import Transaction from "../models/Transaction.js";

const postUploadBankStatement = async (req, res) => {
  const uniqueNameId = uuidv4();

  if (!req.file) {
    return res.status(400).json({ message: "No file" });
  }

  const MAX_SIZE = 8 * 1024 * 1024;

  if (req.file.size > MAX_SIZE) {
    return res.status(400).json({ message: "File size exceeds 8MB limit" });
  }

  if (req.file.mimetype !== "application/pdf") {
    return res.status(400).json({ message: "File must be pdf" });
  }

  const myFolder = "bankstatement-pdf";
  const myBucket = "my-bucket";
  const myKey = `${myFolder}/${uniqueNameId}.pdf`;

  await Transaction.findOneAndUpdate(
    { user_id: req.user.id },
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

  // const result = celeryClient.sendTask("tasks.add", [], {
  //   fileBucket: myBucket,
  //   fileKey: myKey,
  //   fileName: uniqueNameId,
  //   userId: req.user.id,
  // });

  res.json({ message: `upload file` });
};

export { postUploadBankStatement };
