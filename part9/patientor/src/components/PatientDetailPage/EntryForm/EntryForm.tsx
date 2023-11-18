import { Stack, Select, MenuItem } from "@mui/material";
import CardComponent from "../../Card";
import React, { useState, Dispatch } from "react";
import { EntryFormValues, BaseEntryFormValues, EntryType, EntryOpts } from "../../../types";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";
import { DateInput, MultiSelectInput, TextInput, today } from "./InputFields";
import useDiagnoses from "../../../hooks/useDiagnoses";

const EntryForm = ({handleSubmit}: {handleSubmit: (values: EntryFormValues) => Promise<void>}) => {
    const [type, setType] = useState<EntryType>('HealthCheck');
    
    const renderForm = () => {
        switch(type) {
            case 'HealthCheck':
                return <HealthCheckEntryForm handleSubmit={handleSubmit} />;
            case 'Hospital':
                return <HospitalEntryForm handleSubmit={handleSubmit} />;
            case 'OccupationalHealthcare':
                return <OccupationalHealthcareEntryForm handleSubmit={handleSubmit} />;
            default:
                return null;
        }
    };
    return (
        <CardComponent minWidth={275}>
            <h3 >
                New {' '}
                <Select
                    id="type"
                    value={type}
                    onChange={e => setType(e.target.value)}
                    size={"small"}
                >
                    {
                        EntryOpts.map((opt) => 
                            <MenuItem value={opt}>{opt}</MenuItem>
                        )

                    }
                </Select>
                {' '} Entry
            </h3>
            {renderForm()}
        </CardComponent> 
    );
};


export const BasicFields = ({values, setValues }: {values: BaseEntryFormValues, setValues: Dispatch<BaseEntryFormValues>}) => {
    const { diagnoses } = useDiagnoses();
    const diagnosisCodes = diagnoses?.map(item => item.code);
    
    return (
    <>
        <DateInput 
            label="Date"
            value={values['date']}
            onChange={value => setValues({...values, date: value ?? today()})}
        />
        <TextInput
            id="description"
            label="Description"
            value={values['description']}
            onChange={e => setValues({...values, description: e.target.value})}
        />
        <Stack spacing={2} direction="row" sx={{marginBottom: 2}}>
            <TextInput
                id="specialist"
                label="Specialist"
                value={values['specialist']}
                onChange={e => setValues({...values, specialist: e.target.value})}
            />
            <MultiSelectInput
                label="Diagnosis codes"
                selected={values['diagnosisCodes']}
                options={diagnosisCodes || []}
                onChange={selected => setValues({...values, diagnosisCodes: selected ?? []})} 
            />
        </Stack>
    </>);
};

export default EntryForm;
