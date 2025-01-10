import express, { Request, Response, NextFunction } from 'express';
import patientsService from '../services/patientsService';
import { NewPatientEntry, NonSensitivePatientEntry, EntryWithoutId, Entry } from '../types';
import { NewHealthCheckEntrySchema, NewPatientEntrySchema } from '../utils';
import diagnosesService from '../services/diagnosesService';
import { v1 as uuid } from 'uuid';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    diagnosesService.parseDiagnosisCodes(req.body);
    next();
  } catch (e: unknown) {
    next(e);
  }
};

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response) => {
  const patient = patientsService.getEntries().find(p => p.id === req.params.id);
  if (patient) {
    try {
      const newEntryWithoutId = req.body;
      const diagnoses = diagnosesService.parseDiagnosisCodes(newEntryWithoutId);
      NewHealthCheckEntrySchema.parse(req.body);
      newEntryWithoutId.diagnosisCodes = diagnoses;
  
      const newEntry: Entry = {
        ...newEntryWithoutId,
        id: uuid()
      };
  
      patient.entries?.push(newEntry);
      res.json(newEntry);
    } catch (e: unknown) {
      res.status(400).send((e as Error).message);
    }
  } else {
    res.sendStatus(404);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getEntries().find(p => p.id === req.params.id);
  // if patient does not have entries, return an empty array
  if (patient && !patient.entries) {
    patient.entries = [];
  }
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
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