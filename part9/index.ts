import express from 'express';
import { calculateBmi, getBmiArgs } from './bmiCalculator';
import { calculateExercises, getExerciseCalculatorArgs } from './exerciseCalculator'

const PORT = 3600;

const app = express();
app.use(express.json())

app.get('/', (_req,res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const bmiArgs = getBmiArgs(['', '', String(req.query.height), String(req.query.weight)]);
    return res.json({ ...req.query, bmi: calculateBmi(bmiArgs) });
  } catch (err) {
    return res.json({ error: err.message });
  }
});

app.post('/exercise', (req, res) => {
  try {
    const exerciseArgs = getExerciseCalculatorArgs(['', '', req.body.target, ...req.body.daily_exercises])
    return res.json(calculateExercises(exerciseArgs))
  } catch (err) {
    return res.json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

