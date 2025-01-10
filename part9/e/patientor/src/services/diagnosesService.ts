import diagnoseData from '../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData;

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export default {
  getEntries,
  parseDiagnosisCodes
};
