import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../utils/s3.js";
import celeryClient from "../utils/celeryClient.js";

const postUploadBankStatement = async (req, res) => {
  // if (!req.file) {
  //   return res.status(400).json({ message: "no file" });
  // }

  // const folder = `bank-statement`;
  // await s3.send(
  //   new PutObjectCommand({
  //     Bucket: "my-bucket",
  //     Key: `${folder}/${req.file.originalname}`,
  //     Body: req.file.buffer,
  //     ContentType: req.file.mimetype,
  //   }),
  // );

  const result = celeryClient.sendTask("tasks.add", [1, 2], {});
  res.json({ message: `upload file ${result.taskId}` });
};

export { postUploadBankStatement };
