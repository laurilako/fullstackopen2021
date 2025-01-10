import { z } from 'zod';
import { NewPatientEntrySchema } from './utils';

export interface HospitalEntry {
    id: string;
    date: string;
    type: "Hospital";
    specialist: string;
    diagnosisCodes?: string[];
    description: string;
    discharge: {
        date: string;
        criteria: string;
    };
}

export interface OccupationalHealthcareEntry {
    id: string;
    date: string;
    type: "OccupationalHealthcare";
    specialist: string;
    employerName: string;
    diagnosisCodes?: string[];
    description: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
  
export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries?: Entry[];
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;