import express from 'express';
import data from '../../data/patients';
import { NonSensitivePatient, Patient, toPatient } from '../types';
import { addPatient } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patientData: NonSensitivePatient[] = data.map(patient => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, entries, ...nonSensitiveFields } = patient;
    return nonSensitiveFields;
  });
  res.send(patientData);
});

router.get('/:id',(_req, res) => {
  const patientData = data.find(patient => patient.id === _req.params['id']);

  if(patientData){
    res.send(patientData);
  }
  res.status(400).send('Not found');
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