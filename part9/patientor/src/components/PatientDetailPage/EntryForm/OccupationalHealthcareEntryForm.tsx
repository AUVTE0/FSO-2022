import { useState } from "react";
import { EntryFormValues, OccupationalHealthcareEntryFormValues } from "../../../types";
import { BasicFields } from "./EntryForm";
import { Button, Stack } from "@mui/material";
import { DateInput, TextInput, today } from "./InputFields";

const HospitalEntryForm = ({handleSubmit}: {handleSubmit: (values: EntryFormValues) => Promise<void>;}) => {
    const sickLeaveInit = {
        startDate: today(),
        endDate: today(),
    };
    
    const [values, setValues] = useState<OccupationalHealthcareEntryFormValues>({
        type: 'OccupationalHealthcare',
        description: '',
        date: today(),
        specialist: '',
        diagnosisCodes: [],
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
                <DateInput
                    label="Sick Leave Start Date"
                    value={values.sickLeave?.startDate ?? new Date().toString()}
                    onChange={value => setValues({...values, sickLeave: {...values.sickLeave, startDate: value ?? today()}})}
                />
                <DateInput
                    label="Sick Leave End Date"
                    value={values.sickLeave?.endDate ?? new Date().toString()}
                    onChange={value => setValues({...values, sickLeave: {...values.sickLeave, endDate: value ?? today()}})}
                />
            </Stack>
            <Button type="submit">Submit</Button>
        </form> 
    );
};

export default HospitalEntryForm;