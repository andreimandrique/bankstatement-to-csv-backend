import { env } from 'cloudflare:workers';

import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
	region: 'auto',
	endpoint: env.AWS_ENDPOINT_URL,
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY,
		secretAccessKey: env.AWS_SECRET_KEY,
	},
});

export default s3;
