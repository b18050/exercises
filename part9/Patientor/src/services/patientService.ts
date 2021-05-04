import patients from '../../data/patients.json';
import {NewPatientEntry, PatientEntry, NonssnPatientEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getEntries = (): PatientEntry[] => {
    return patients;
};

const getNonssEntries = (): NonssnPatientEntry[]=> {
    return patients.map(({id, name, dateOfBirth, ssn,gender, occupation} ) => ({
        id,
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    }));
};
  
const addPatient = ( entry: NewPatientEntry): PatientEntry => {

    const newPatientEntry = {
            id: uuid(),
            ...entry
        };

    patients.push(newPatientEntry);
    return newPatientEntry;
    
};
  
export default {
    getEntries,
    addPatient,
    getNonssEntries
};