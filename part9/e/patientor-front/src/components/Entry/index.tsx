import React from 'react';
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../../types';
import { Box, Paper } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SickIcon from '@mui/icons-material/Sick';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

interface HospitalEntryProps {
    entry: HospitalEntry;
    diagnoses: Diagnosis[];
}
  
interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

function assertNever(Entry: never): React.ReactNode {
    throw new Error('Unhandled Entry type: ' + Entry);
}

const EntryDetails: React.FC<{ entry: Entry, diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryComponent entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryComponent entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckEntryComponent entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const HospitalEntryComponent: React.FC<HospitalEntryProps> = ({ entry, diagnoses }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, border: '1px dashed grey' }}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        Hospital entry <LocalHospitalIcon style={{marginLeft: '0.2rem', color: 'red'}}/>
      </div>
      <p>{entry.date} <i>{entry.description}</i></p>
      <ul>
        {entry.diagnosisCodes?.map((code: string) => (
          <li key={code}>
            {code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}
          </li>
        ))}
      </ul>
      <p>Discharge: {entry.discharge.date} <i>{entry.discharge.criteria}</i></p>
      <p>Diagnose by {entry.specialist}</p>
    </Paper>
  );
};

const OccupationalHealthcareEntryComponent: React.FC<OccupationalHealthcareEntryProps> = ({ entry, diagnoses }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, border: '1px dashed grey' }}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        Occupational healthcare entry <SickIcon style={{ marginLeft: '0.2rem'}}/>
      </div>
      <p>{entry.date} <i>{entry.description}</i></p>
      <p>Employer name: {entry.employerName}</p>
      <ul>
        {entry.diagnosisCodes?.map((code: string) => (
          <li key={code}>
            {code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}
          </li>
        ))}
      </ul>
      <p>Diagnose by {entry.specialist}</p>
    </Paper>
  );
};

const HealthCheckEntryComponent: React.FC<HealthCheckEntryProps> = ({ entry, diagnoses }) => {

    const getHealtCheckStatus = (rating: number) => {
        switch (rating) {
            case 0:
                return {color: 'green', status: 'Healthy'};
            case 1:
                return {color: 'yellow', status: 'Low Risk'};
            case 2:
                return {color: 'orange', status: 'High Risk'};
            case 3:
                return {color: 'red', status: 'Critical Risk'};
            default:
                return {color: 'black', status: 'Unknown'};
        }
    };

  return (
    <Paper elevation={3} sx={{ p: 2, border: '1px dashed grey' }}>
        <div style={{display: 'flex', alignItems: 'center'}}>
            Health check entry <MedicalInformationIcon style={{marginLeft: '0.2rem'}}/>
        </div>
      <p>{entry.date} <i>{entry.description}</i></p>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <MonitorHeartIcon style={{ color: getHealtCheckStatus(entry.healthCheckRating).color }}/>
            <i style={{marginLeft: '0.2rem'}}>{getHealtCheckStatus(entry.healthCheckRating).status}</i>
        </div>
      <ul>
        {entry.diagnosisCodes?.map((code: string) => (
          <li key={code}>
            {code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}
          </li>
        ))}
      </ul>
      <p>Diagnose by {entry.specialist}</p>
    </Paper>
  );
};

const EntryComponent: React.FC<EntryProps> = ({ entry, diagnoses }) => {
  return (
    <Box>
      <EntryDetails entry={entry} diagnoses={diagnoses} />
    </Box>
  );
};

export default EntryComponent;
