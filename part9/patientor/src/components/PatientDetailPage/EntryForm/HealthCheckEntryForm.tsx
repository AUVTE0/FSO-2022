import { useState } from "react";
import { EntryFormValues, HealthCheckEntryFormValues } from "../../../types";
import { BasicFields, TextInput } from "./EntryForm";
import { Button } from "@mui/material";


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