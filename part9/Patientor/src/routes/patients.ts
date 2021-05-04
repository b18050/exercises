import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonssEntries());
});

// router.post('/', (_req, res) => {
//   const {name,dateOfBirth,gender,ssn,occupation} = _req.body;
//   const newPatient = patientService.addPatient({
//         name,
//         dateOfBirth,
//         gender,
//         ssn,
//         occupation
//   });
//   res.json(newPatient);
// });

router.post('/', (_req,res) => {

    try{
        const newPatientEntry = toNewPatientEntry(_req.body);

        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (e) {
        res.status(400).send(e.message);
    }
})

export default router;