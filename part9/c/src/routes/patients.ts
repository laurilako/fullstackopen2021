import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e: unknown) {
    let errorMessage = 'Error!';
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;