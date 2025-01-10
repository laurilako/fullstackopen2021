import { NewPatientEntry, Gender, EntryWithoutId, HealthCheckRating } from './types';
import { z } from 'zod';

export const NewPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string()
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return NewPatientEntrySchema.parse(object);
};

export const NewHealthCheckEntrySchema = z.object({
    description: z.string(),
    type: z.literal('HealthCheck'),
    date: z.string().date(),
    specialist: z.string(),
    healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export const toNewHealthCheckEntry = (object: unknown): EntryWithoutId => {
    return NewHealthCheckEntrySchema.parse(object);
};