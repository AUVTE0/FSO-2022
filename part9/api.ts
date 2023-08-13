import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const params = req.query
    try {
        const height = Number(params['height']);
        const weight = Number(params['weight']);

        if(!height || !weight){
            res.status(403)
            res.send('malformatted parameters')
            return;
        }
        res.send(calculateBmi(height, weight))
    }
    catch (error: unknown){
        let message = 'Error ocurred: ';
        if(error instanceof Error){
            message += error.message;
        }
        res.status(403).send(message);
    } 
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});