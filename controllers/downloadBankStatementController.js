import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../utils/s3.js";
import Transaction from "../models/Transaction.js";

const getDownloadBankStatement = async (req, res) => {
  const transaction = await Transaction.findOne({ google_id: req.user.sub });

  const uniqueNameId = transaction.bankstatement_csv;
  const myFolder = "bankstatement-csv";
  const myBucket = "my-bucket";
  const myKey = `${myFolder}/${uniqueNameId}`;

  const bucketParams = {
    Bucket: myBucket,
    Key: myKey,
  };

  const response = await s3.send(new GetObjectCommand(bucketParams));

  res.writeHead(200, {
    "Content-Type": response.ContentType,
    "Content-Length": response.ContentLength,
    "Content-Disposition": `attachment; filename=${uniqueNameId}`,
  });

  response.Body.pipe(res);
};

export { getDownloadBankStatement };
