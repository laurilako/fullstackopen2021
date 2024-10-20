import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../../types';
import patientService from '../../services/patients';

const PatientPage: React.FC = () => {

    const [patient, setPatient] = React.useState<Patient | null>(null);

    const { id } = useParams<{ id: string }>();

    const fetchPatient = async () => {
        const patient = await patientService.getWithId(id as string);
        setPatient(patient);
        console.log(patient);
    };

    useEffect(() => {
        void fetchPatient();
    });

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
                            <li key={code}>{code}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default PatientPage;