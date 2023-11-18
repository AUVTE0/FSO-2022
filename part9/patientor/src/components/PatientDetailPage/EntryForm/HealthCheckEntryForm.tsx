import { useState } from "react";
import { EntryFormValues, HealthCheckEntryFormValues } from "../../../types";
import { BasicFields } from "./EntryForm";
import { Button } from "@mui/material";
import { TextInput, today } from "./InputFields";

const HealthCheckEntryForm = ({handleSubmit}: {handleSubmit: (values: EntryFormValues) => Promise<void>;}) => {
    const [values, setValues] = useState<HealthCheckEntryFormValues>({
        type: 'HealthCheck',
        description: '',
        date: today(),
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: ''
    });
    const addEntry = ( e: React.FormEvent ) => {
        e.preventDefault();
        void handleSubmit(values);
    };
    return (
        <form onSubmit={addEntry}>
            <BasicFields values={values} setValues={setValues}/>
            <TextInput
                    id="healthCheckRating"
                    label="Healthcheck rating"
                    value={values.healthCheckRating}
                    onChange={e => setValues({...values, healthCheckRating: e.target.value})}
                />
            <Button type="submit">Submit</Button>
        </form> 
    );
};

export default HealthCheckEntryForm;