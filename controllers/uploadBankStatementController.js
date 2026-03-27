import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../utils/s3.js";
import celeryClient from "../utils/celeryClient.js";

const postUploadBankStatement = async (req, res) => {
  const uniqueNameId = uuidv4();

  if (!req.file) {
    return res.status(400).json({ message: "no file" });
  }

  const myFolder = `bankstatement-pdf`;
  const myBucket = "my-bucket";
  const myKey = `${myFolder}/${uniqueNameId}.pdf`;

  await s3.send(
    new PutObjectCommand({
      Bucket: myBucket,
      Key: myKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }),
  );

  const result = celeryClient.sendTask("tasks.add", [], {
    fileBucket: myBucket,
    fileKey: myKey,
    fileName: uniqueNameId,
  });

  res.json({ message: `upload file ${result.taskId}` });
};

export { postUploadBankStatement };
