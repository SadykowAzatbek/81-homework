import cors from 'cors';
import express from 'express';
import mongoose from "mongoose";
import config from "./config";
import linksRouter from "./routers/links";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/links', linksRouter);

const run = async () => {
    await  mongoose.connect(config.mongoose.db)

    app.listen(port, () => {
        console.log(`server started on ${port} port`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

void run();
