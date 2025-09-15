//BACKEND/index.js
import express from 'express';
import dotenv from 'dotenv';
import appRoutes from './api.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const INFO = `\x1b[1;34m[INFO]\x1b[0m`;
const ERROR = `\x1b[31m[ERROR]\x1b[0m`;
const WARN = `\x1b[1;33m[WARN]\x1b[0m`;

app.use(express.json());

app.use('/', appRoutes);

app.use((req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || 'Unknown IP';
    const host = req.headers.host || 'Unknown Host';
    const referer = req.headers.referer || req.get('referer') || 'No Referer';

    console.info(`Incoming ${req.method} request ${req.url} from: {IP:${ip} Host:${host} Referer:${referer}}`);
    next();
});

async function startServer() {
    console.log(INFO + ' Starting the server...');

    try {
        console.log(WARN + ' This backend build still in development stage.');

        app.listen(PORT, () => {
            console.log(INFO + ' Server is up and running on port ' + PORT);
        });
    } catch (err) {
        console.error(ERROR + ' Failed to start server:', err);
        process.exit(1);
    }
}

startServer().catch(err => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
});
