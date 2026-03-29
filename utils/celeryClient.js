import celery from "celery-node";
import dotenv from "dotenv";

dotenv.config();

const celeryClient = celery.createClient(
  process.env.REDIS_URL,
  process.env.REDIS_URL,
);

export default celeryClient;
