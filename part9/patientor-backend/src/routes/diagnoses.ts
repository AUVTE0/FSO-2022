import express from 'express';
import data from '../../data/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  // res.send('Fetching all diagnoses!');
  res.send(data);
});

export default router;