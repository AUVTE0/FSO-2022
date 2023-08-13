import express from 'express';
import data from '../../data/patients';
import { NonSensitivePatient, Patient, toPatient } from '../types';
import { addPatient } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patientData: NonSensitivePatient[] = data.map(patient => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...nonSensitiveFields } = patient;
    return nonSensitiveFields;
  });
  res.send(patientData);
});

router.post('/', (req, res) => {
  try {
    console.log(req.body);
    const newPatient: Patient = toPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  }
  catch (error: unknown) {
    let errorMessage = 'Error: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;