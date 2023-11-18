import { useState } from "react";
import { EntryFormValues, OccupationalHealthcareEntryFormValues } from "../../../types";
import { BasicFields, TextInput } from "./EntryForm";
import { Button, Stack } from "@mui/material";


const HospitalEntryForm = ({handleSubmit}: {handleSubmit: (values: EntryFormValues) => Promise<void>;}) => {
    const sickLeaveInit = {
        startDate: '',
        endDate: ''
    };
    
    const [values, setValues] = useState<OccupationalHealthcareEntryFormValues>({
        type: 'OccupationalHealthcare',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: '',
        employerName: '',
        sickLeave: sickLeaveInit,
    });
    const addEntry = ( e: React.FormEvent ) => {
        e.preventDefault();
        void handleSubmit(values);
    };
    return (
        <form onSubmit={addEntry}>
            <BasicFields values={values} setValues={setValues}/>
            <TextInput
                id="employerName"
                label="Employer Name"
                value={values.employerName}
                onChange={e => setValues({...values, employerName: e.target.value})}
            />
            <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
                <TextInput
                    id="sickLeaveStart"
                    label="Sick Leave Start Date"
                    value={values.sickLeave?.startDate}
                    onChange={e => setValues({...values, sickLeave: {...values.sickLeave, startDate: e.target.value}})}
                />
                <TextInput
                    id="sickLeaveEnd"
                    label="Sick Leave End Date"
                    value={values.sickLeave?.endDate}
                    onChange={e => setValues({...values, sickLeave: {...values.sickLeave, endDate: e.target.value}})}
                />
            </Stack>
            <Button type="submit">Submit</Button>
        </form> 
    );
};

export default HospitalEntryForm;