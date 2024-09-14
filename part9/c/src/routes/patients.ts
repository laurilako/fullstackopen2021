import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import { NewPatientEntry, NonSensitivePatientEntry } from '../types';
import { NewPatientEntrySchema } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewPatientEntrySchema.parse(req.body);
    next();
  } catch (e: unknown) {
    next(e);
  }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<NonSensitivePatientEntry[]>) => {
  const newPatientEntry = patientsService.addPatient(req.body);
  res.json(newPatientEntry);
});

export default router;