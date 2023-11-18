import { useState } from "react";
import { EntryFormValues, HospitalEntryFormValues } from "../../../types";
import { BasicFields, TextInput } from "./EntryForm";
import { Button, Stack } from "@mui/material";


const HospitalEntryForm = ({handleSubmit}: {handleSubmit: (values: EntryFormValues) => Promise<void>;}) => {
    const initDischarge = {
        date: '',
        criteria: ''
    };
    
    const [values, setValues] = useState<HospitalEntryFormValues>({
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: '',
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
                <TextInput
                        id="dischargeDate"
                        label="Discharge Date"
                        value={values.discharge?.date}
                        onChange={e => setValues({...values, discharge: {...values.discharge, date: e.target.value}})}
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