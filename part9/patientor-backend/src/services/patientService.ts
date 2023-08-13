import { Patient } from "../types";
import data from '../../data/patients';

export const addPatient = (entry: Patient): Patient => {
    data.push(entry);
    return entry;
};