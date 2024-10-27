export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

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

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;