import cors from 'cors';
import express from 'express';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`server started on ${port} port`);
});