import express from 'express';
import { calculateBmi } from './bmiCalculator';

import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json())
app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {

    const weight: number = Number(_req.query.weight);
    const height: number = Number(_req.query.height);
    const bmi: string = calculateBmi(weight, height);
    console.log(bmi)
    const result = {
        weight,
        height,
        bmi
    }
    res.send(result);
});

app.post('/exercises', (_req,res) => {

    console.log(_req);
    const arr = _req.body.daily_exercises;
    const target = _req.body.target;

    let result ;
    try {
        result = calculateExercises(arr, target);
    }
    catch(e) {
        result = e.message;
    }
    

    res.send(result);
});
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});