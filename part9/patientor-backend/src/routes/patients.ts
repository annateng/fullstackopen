import express from 'express';
import patientService from '../services/patient-service';
import { toNewPatient } from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonsensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (err) { throw new Error(err.message); }
});

export default router;