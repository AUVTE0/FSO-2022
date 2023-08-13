import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import bodyParser from 'body-parser';

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
            res.status(400).send('malformatted parameters')
            return;
        }
        res.send(calculateBmi(height, weight))
    }
    catch (error: unknown){
        let message = 'Error ocurred: ';
        if(error instanceof Error){
            message += error.message;
        }
        res.status(500).send(message);
    } 
})

app.post('/exercises', bodyParser.json(), (req, res) => {
    const inputs = req.body;
    if(!inputs.daily_exercises || !inputs.target){
        res.status(400).send('parameters missing');
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const schedIsNumberArray = inputs['daily_exercises'].reduce((a: any, b: any) => a && !isNaN(Number(b)), true)

    if (isNaN(Number(inputs['target'])) || !schedIsNumberArray){
        res.status(400).send('malformed parameters');
        return;
    }
    try{
        const result = calculateExercises(inputs.daily_exercises, inputs.target)
        res.send(JSON.stringify(result));
        return;
    }
    catch(error: unknown){
        let message = 'Error ocurred: ';
        if(error instanceof Error){
            message += error.message;
        }
        res.status(500).send(message);
    }
})

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});