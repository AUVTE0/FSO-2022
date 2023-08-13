import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
    res.send("pong");
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});