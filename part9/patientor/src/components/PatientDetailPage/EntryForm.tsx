import { TextField, Button, Stack } from "@mui/material";
import CardComponent from "../Card";
import React, { useState } from "react";
import { EntryFormValues, HealthCheckEntryFormValues } from "../../types";

type FieldIds = 'description' | 'date' | 'specialist' | 'diagnosisCodes'| 'healthCheckRating';

const TextInput = ({id, label, value, onChange}: 
    {
        id: FieldIds, 
        label: string, 
        value: string | undefined, 
        onChange: React.ChangeEventHandler<HTMLInputElement>
    }) => (
    <TextField
        id={id}
        label={label}
        variant="outlined"
        fullWidth
        sx={{mb: 2}}
        size="small"
        value={value}
        onChange={onChange}
    />
);

const HealthCheckEntryForm = ({handleSubmit}: {handleSubmit: (values: EntryFormValues) => Promise<void>;}) => {
    const [values, setValues] = useState<HealthCheckEntryFormValues>({
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: '',
        healthCheckRating: ''
    });
    const addEntry = ( e: React.FormEvent ) => {
        e.preventDefault();
        console.log(values);
        void handleSubmit(values);
    };
    return (
        <CardComponent minWidth={275}>
            <h3>New Healthcheck Entry</h3>
            <form onSubmit={addEntry}>
                <TextInput
                    id="description"
                    label="Description"
                    value={values['description']}
                    onChange={e => setValues({...values, description: e.target.value})}
                />
                <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
                    <TextInput
                        id="date"
                        label="Date"
                        value={values['date']}
                        onChange={e => setValues({...values, date: e.target.value})}
                    />
                    <TextInput
                        id="specialist"
                        label="Specialist"
                        value={values['specialist']}
                        onChange={e => setValues({...values, specialist: e.target.value})}
                    />
                    <TextInput
                        id="healthCheckRating"
                        label="Healthcheck rating"
                        value={values['healthCheckRating']}
                        onChange={e => setValues({...values, healthCheckRating: e.target.value})}
                    />
                </Stack>
                <TextInput
                    id="diagnosisCodes"
                    label="Diagnosis codes"
                    value={values['diagnosisCodes']}
                    onChange={e => setValues({...values, diagnosisCodes: e.target.value})}
                />
                <Button type="submit">Submit</Button>
            </form> 
        </CardComponent> 
    );
};

export default HealthCheckEntryForm;