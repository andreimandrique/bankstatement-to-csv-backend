import { redisSubscriber, redisPublisher } from "../utils/redisClient.js";

const postTransaction = async (req, res) => {
  const { success, user_id } = req.body;

  console.log({ success, user_id });

  await redisPublisher.publish(
    `channel:${user_id}`,
    JSON.stringify({ success, user_id }),
  );

  res.json({ message: "Webhook received" });
};

const getTransactionUserId = async (req, res) => {
  const { user_id } = req.params;

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const subscriber = redisSubscriber.duplicate();
  await subscriber.connect();

  await subscriber.subscribe(`channel:${user_id}`, (message) => {
    res.write(`data: ${message}\n\n`);
  });

  req.on("close", async () => {
    await subscriber.unsubscribe(`channel:${user_id}`);
    await subscriber.quit();
    res.end();
  });
};

export { postTransaction, getTransactionUserId };
