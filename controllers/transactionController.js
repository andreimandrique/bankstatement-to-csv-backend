import { redisSubscriber, redisPublisher } from "../utils/redisClient.js";
import dotenv from "dotenv";

dotenv.config();

const postTransaction = async (req, res) => {
  const incomingToken = req.headers["x-celery-signature"];
  const celerySecret = process.env.CELERY_SIGNATURE;
  console.log(req.headers);

  if (!incomingToken || incomingToken !== celerySecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { success, google_id } = req.body;

  await redisPublisher.publish(
    `channel:${google_id}`,
    JSON.stringify({ success, user_id: google_id }),
  );

  res.json({ message: "Webhook received" });
};

const getTransactionUserId = async (req, res) => {
  const { google_id } = req.params;

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const subscriber = redisSubscriber.duplicate();
  await subscriber.connect();

  await subscriber.subscribe(`channel:${google_id}`, (message) => {
    res.write(`data: ${message}\n\n`);
  });

  req.on("close", async () => {
    await subscriber.unsubscribe(`channel:${google_id}`);
    await subscriber.quit();
    res.end();
  });
};

export { postTransaction, getTransactionUserId };
