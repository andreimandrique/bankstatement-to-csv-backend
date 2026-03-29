import redis from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisSubscriber = redis.createClient({ url: process.env.REDIS_URL });
const redisPublisher = redis.createClient({ url: process.env.REDIS_URL });

redisSubscriber.on("error", (err) =>
  console.error("Redis Subscriber Error", err),
);
redisPublisher.on("error", (err) =>
  console.error("Redis Publisher Error", err),
);

(async () => {
  try {
    await Promise.all([redisSubscriber.connect(), redisPublisher.connect()]);
    console.log("Redis Clients Connected");
  } catch (err) {
    console.error("Could not connect to Redis:", err);
  }
})();

export { redisSubscriber, redisPublisher };
