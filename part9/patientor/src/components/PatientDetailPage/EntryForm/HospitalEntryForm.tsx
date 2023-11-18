import { useState } from "react";
import { EntryFormValues, HospitalEntryFormValues } from "../../../types";
import { BasicFields } from "./EntryForm";
import { DateInput, TextInput, today } from "./InputFields";
import { Button, Stack } from "@mui/material";

const HospitalEntryForm = ({handleSubmit}: {handleSubmit: (values: EntryFormValues) => Promise<void>;}) => {
    const initDischarge = {
        date: today(),
        criteria: ''
    };
    
    const [values, setValues] = useState<HospitalEntryFormValues>({
        type: 'Hospital',
        description: '',
        date: today(),
        specialist: '',
        diagnosisCodes: [],
        discharge: initDischarge
    });
    const addEntry = ( e: React.FormEvent ) => {
        e.preventDefault();
        void handleSubmit(values);
    };
    return (
        <form onSubmit={addEntry}>
            <BasicFields values={values} setValues={setValues}/>
            <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
                <DateInput
                        label="Discharge Date"
                        value={values.discharge?.date ?? new Date().toString()}
                        onChange={value => setValues({...values, discharge: {...values.discharge, date: value ?? today()}})}
                    />
                <TextInput
                        id="dischargeCriteria"
                        label="Discharge Criteria"
                        value={values.discharge?.criteria}
                        onChange={e => setValues({...values, discharge: {...values.discharge, criteria: e.target.value}})}
                    />
            </Stack>
            <Button type="submit">Submit</Button>
        </form> 
    );
};

export default HospitalEntryForm;