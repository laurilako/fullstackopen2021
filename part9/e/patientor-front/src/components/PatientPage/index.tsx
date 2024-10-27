import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from '../../types';
import patientService from '../../services/patients';
import Entry from '../Entry';
import { Stack } from '@mui/material';

const PatientPage: React.FC = () => {

    const [patient, setPatient] = React.useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([]);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchPatient = async () => {
            const patient = await patientService.getWithId(id as string);
            setPatient(patient);
        };
        const fetchDiagnoses = async () => {
            const diagnoses = await patientService.getDiagnoses();
            setDiagnoses(diagnoses);
        };
        fetchPatient();
        fetchDiagnoses();
    }, [
        id
    ]);

    return (
        <div>
            <h2>Patient Information</h2>
            <p>Name: {patient?.name}</p>
            <p>Gender: {patient?.gender}</p>
            <p>SSN: {patient?.ssn}</p>
            <p>Date of Birth: {patient?.dateOfBirth}</p>
            <p>Occupation: {patient?.occupation}</p>
            <h3>Entries</h3>
            <Stack spacing={2}>
                {patient?.entries.map(entry => (
                    <div key={entry.id}>
                        <Entry entry={entry} diagnoses={diagnoses} />
                    </div>
                ))}
            </Stack>
        </div>
    );
};

export default PatientPage;