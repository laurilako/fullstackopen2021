import { z } from 'zod';

import { NewPatientEntrySchema } from './utils';

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
};

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
};

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;