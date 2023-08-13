import express, { Request, Response } from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req: Request, res: Response) => {
    console.log("received ping requuest");
    res.send("pong");
});

//routers
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});