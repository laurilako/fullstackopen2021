import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button, InputLabel, Select } from '@mui/material';

import { EntryWithoutId } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('yyyy-MM-dd');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>();
  const [type, setType] = useState('HealthCheck');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
        type: "HealthCheck",
        description,
        date,
        specialist,
        healthCheckRating,
        diagnosisCodes
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
            disabled
            label="Type"
            fullWidth
            value={type}
            onChange={({ target }) => setType(target.value)}
        />
        <TextField
            style={{ marginTop: 10 }}
            label="Description"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
            label="Date"
            placeholder="yyyy-MM-dd"
            style={{ marginTop: 10 }}
            type="date"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
        />
        <TextField
            style={{ marginTop: 10 }}
            label="Specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel style={{ marginTop: 10 }}>Health Check Rating</InputLabel>
        <Select
            multiple={false}
            native
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(Number(target.value))}
            fullWidth
        >
            <option value={Number(0)}>Healthy</option>
            <option value={Number(1)}>Low Risk</option>
            <option value={Number(2)}>High Risk</option>
            <option value={Number(3)}>Critical Risk</option>
        </Select>


        <TextField
            style={{ marginTop: 10 }}
            label="Diagnosis Codes, separated by commas"
            fullWidth
            value={diagnosisCodes}
            // Split the input into an array of strings and remove any whitespace
            onChange={({ target }) => setDiagnosisCodes(target.value.split(",").map(code => code.trim()))}
        />

        <Grid style={{ marginTop: 20}}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;