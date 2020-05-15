import express from 'express';
import patientService from '../services/patient-service';
import { toNewPatient, toNewEntry } from '../utils';
const router = express.Router();

router.get('/:id', (req, res) => {
  res.json(patientService.getPatient(req.params.id));
})

router.post('/:id/entries', (req,res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(req.params.id, newEntry);
    res.json(updatedPatient)
  } catch (err) { throw new Error(err.message); }
})

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