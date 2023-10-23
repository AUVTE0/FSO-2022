import express from 'express';
import data from '../../data/patients';
import { NonSensitivePatient, Patient, toEntry, toPatient } from '../types';
import { addPatient, addEntry } from '../services/patientService';

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
  else{
    res.status(400).send('Not found');
  }
});

router.post('/', (req, res) => {
  try {
    console.log(req.body);
    const newPatient: Patient = toPatient(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  }
  catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id', (req, res) => {
  try {
    console.log(req.body);
    const patientId = req.params['id'];
    const patientData = data.find(patient => patient.id === patientId); 
    if(!req.body){
      res.status(400).send('No entry data sent');
    }
    if(!patientData){
      res.status(400).send('Patient not found');
    }
    
    const newEntry= toEntry(req.body);
    const addedEntry = addEntry(newEntry, patientData as Patient);
    res.json(addedEntry);
  }
  catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;