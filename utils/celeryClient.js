import celery from "celery-node";

const celeryClient = celery.createClient(
  process.env.CELERY_BROKER_URL,
  process.env.CELERY_BROKER_URL,
);

export default celeryClient;
