import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { EntryFormValues, Patient } from "../../types";
import EntryForm from "./EntryForm/EntryForm";
import axios from "axios";
import { Alert } from "@mui/material";
import PatientSummary from "./PatientSummary";
import PatientEntries from "./PatientEntries";

const PatientDetailPage = () => {
    const id = useParams().id;
    const [patient, setPatient] = useState<Patient>();
    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();

    useEffect(() => {
        const fetchPatient = async () => {
          const patient = await patientService.getOne(id ?? '');
          setPatient(patient);
        };
        void fetchPatient();
      }, []);
    
    const handleSubmit = async (values: EntryFormValues) => {
        setError(undefined);
        setSuccess(undefined);
        try {
            if(patient){
                const entry = await patientService.createEntry(patient.id, values);
                setPatient({...patient, entries: patient?.entries.concat(entry)});
                setSuccess('New entry added');
            }
          } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
              if (e.response?.data && typeof e.response?.data === "string") {
                const message = e.response.data.replace('Something went wrong. Error: ', '');
                console.error(message);
                setError(message);
              } else {
                setError("Unrecognized axios error");
              }
            } else {
              console.error("Unknown error", e);
              setError("Unknown error");
            }
          }
    };

    return patient? (
        <>
            <PatientSummary patient={patient} />
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <EntryForm handleSubmit={handleSubmit}/>
            <PatientEntries entries={patient.entries} />
        </>
    )
    : null;
};

export default PatientDetailPage;