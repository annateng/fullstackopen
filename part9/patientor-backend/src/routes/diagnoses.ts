import express from 'express';
import diagnosesService from '../services/diagnoses-service';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(diagnosesService.getDiagnoses());
});

export default router;