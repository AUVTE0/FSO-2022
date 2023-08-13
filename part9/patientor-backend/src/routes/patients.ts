import express from 'express';
import data from '../../data/patients';
import { NonSensitivePatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patientData: NonSensitivePatient[] = data.map(patient => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...nonSensitiveFields } = patient;
    return nonSensitiveFields;
  });
  res.send(patientData);
});

export default router;