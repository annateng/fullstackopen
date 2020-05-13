import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses';

const PORT = 3001;

const app = express();
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
