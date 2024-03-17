import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

const port = 3000;

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (!height || !weight) {
        res.json({ error: "malformatted parameters" });
    } else {
        const bmi = calculateBmi(height, weight);
        res.json({ weight, height, bmi });
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { daily_exercises, target } = req.body as any;
    if (!daily_exercises || !target) {
        res.json({ error: "parameters missing" });
    } else {
        const hours = daily_exercises.map((h: number) => Number(h));
        // check if all values are numbers
        if (isNaN(Number(target)) || hours.some((h: number) => isNaN(h))) {
            res.json({ error: "malformatted parameters" });
        } else {
            const result = calculateExercises(hours, Number(target));
            res.json(result);
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});