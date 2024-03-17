import patientData from '../data/patients';

import { Patient, NonSensitivePatientEntry } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getEntries,
    getNonSensitiveEntries
};
