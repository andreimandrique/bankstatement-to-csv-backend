import { env } from 'cloudflare:workers';
import { httpServerHandler } from 'cloudflare:node';
import express from 'express';

import uploadBankStatementRouter from '../routes/uploadBankStatementRouter';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/upload-bankstatement', uploadBankStatementRouter);

// Health check endpoint
app.get('/', (req, res) => {
	res.json({ message: `Express.js running on Cloudflare Workers! ${env.MY_NAME}` });
});

app.listen(3000);
export default httpServerHandler({ port: 3000 });
