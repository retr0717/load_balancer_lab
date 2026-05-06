import express from 'express';
const promClient = require('prom-client');
import os from 'os';

const app = express();
const PORT = 3000;

const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

const counter = new promClient.Counter({
    name: 'requests_total',
    help: 'Total number of requests',
    labelNames: ["server"]
});

app.get('/', (req, res) => {
    counter.inc({ server: process.env.SERVER_ID });
    res.send(`Response from ${process.env.SERVER_ID} (hostname: ${os.hostname()})`);
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
});

app.listen(PORT, () => {
    console.log(`Server ${process.env.SERVER_ID} is running on port ${PORT}`);
});