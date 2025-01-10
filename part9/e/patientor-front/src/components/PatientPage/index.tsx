import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis, HealthCheckEntry } from '../../types';
import patientService from '../../services/patients';
import Entry from '../Entry';
import { Button, Stack } from '@mui/material';
import AddEntryModal from '../AddEntryModal';
import axios from 'axios';

const PatientPage: React.FC = () => {

    const [patient, setPatient] = React.useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
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
        id, patient
    ]);

    const handleOpen = () => {
        openModal();
    };

    const submitNewEntry = async (values: HealthCheckEntry) => {
        try {
            if (id) {
                const addedEntry = await patientService.addEntry(id, values);
                patient?.entries.push(addedEntry);
                closeModal();
            } else {
                setError("Patient ID is missing");
            }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                }
                else if (e.request.response) {
                    const errorObject = JSON.parse(e.request.response);
                    setError(errorObject[0].message + " in field " + errorObject[0].path);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
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
            <Stack spacing={2}>
                {patient?.entries.map(entry => (
                    <div key={entry.id}>
                        <Entry entry={entry} diagnoses={diagnoses} />
                    </div>
                ))}
            </Stack>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button 
                variant="contained"
                onClick={() => handleOpen()}
                sx={{ mt: 2 }
            }>
                ADD NEW ENTRY
            </Button>
        </div>
    );
};

export default PatientPage;