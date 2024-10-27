import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from '../../types';
import patientService from '../../services/patients';

const PatientPage: React.FC = () => {

    const [patient, setPatient] = React.useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([]);

    const { id } = useParams<{ id: string }>();

    const fetchPatient = async () => {
        const patient = await patientService.getWithId(id as string);
        setPatient(patient);
    };

    const fetchDiagnoses = async () => {
        const diagnoses = await patientService.getDiagnoses();
        setDiagnoses(diagnoses);
    };

    useEffect(() => {
        void fetchPatient();
        void fetchDiagnoses();
    }, []);

    const getDiagnosisName = (code: string): string => {
        const diagnosisName = diagnoses.find(diagnosis => diagnosis.code === code);
        return diagnosisName ? diagnosisName.name : '';
    };

    return (
        <div>
            <h2>Patient Information</h2>
            <p>Name: {patient?.name}</p>
            <p>Gender: {patient?.gender}</p>
            <p>SSN: {patient?.ssn}</p>
            <p>Date of Birth: {patient?.dateOfBirth}</p>
            <p>Occupation: {patient?.occupation}</p>
            <h3>Entries</h3>
            {patient?.entries.map(entry => (
                <div key={entry.id}>
                    <p>{entry.date} {entry.description}</p>
                    <ul>
                        {entry.diagnosisCodes?.map(code => (
                            <li key={code}>{code} {getDiagnosisName(code)}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PatientPage;