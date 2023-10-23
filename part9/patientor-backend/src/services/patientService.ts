import { Patient, Entry } from "../types";
import data from '../../data/patients';

export const addPatient = (entry: Patient): Patient => {
    data.push(entry);
    return entry;
};

export const addEntry = (entry: Entry, patientData: Patient): Entry => {
    patientData.entries.push(entry);
    data.filter(patient => patient.id !== patientData.id);
    data.push(patientData);
    return entry;
};