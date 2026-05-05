import express from 'express';
import os from 'os';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`Response from ${process.env.SERVER_ID} (hostname: ${os.hostname()})`);
});

app.listen(PORT, () => {
    console.log(`Server ${process.env.SERVER_ID} is running on port ${PORT}`);
});