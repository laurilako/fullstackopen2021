import { NewPatientEntry, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown, name: string): string => {
    if (!text || !isString(text)) {
        throw new Error(`Incorrect or missing ${name}: ${text}`);
    }
    return text;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${date}`);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error(`Incorrect gender: ${gender}`);
    }
    return gender;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const newEntry: NewPatientEntry = {
            name: parseString(object.name, 'name'),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn, 'ssn'),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation, 'occupation')
        };
        return newEntry;
    }
    throw new Error('Incorrect or missing data');
};