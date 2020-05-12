import express from 'express';
import { calculateBmi, getBmiArgs } from './bmiCalculator'

const PORT = 3600;

const app = express();

app.get('/', (_req,res) => {
  res.send('Hello Full Stack!')
});

app.get('/bmi', (req, res) => {
  let bmiArgs;

  try {
    const args = ['', '', String(req.query.height), String(req.query.weight)];
    bmiArgs = getBmiArgs(args)
  } catch (err) {
    return res.json({ error: err.message })
  }

  const out = {
    ...req.query,
    bmi: calculateBmi(bmiArgs)
  }

  return res.json(out)
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});