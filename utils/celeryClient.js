import celery from "celery-node";

import dotenv from "dotenv";
dotenv.config();

const celeryClient = celery.createClient(
  process.env.CELERY_BROKER_URL,
  process.env.CELERY_BROKER_URL,
);

export default celeryClient;
