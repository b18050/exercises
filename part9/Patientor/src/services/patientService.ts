import patientsData from '../../data/patients.json';
import {PatientEntry} from '../types';

const patients: Array<PatientEntry> = patientsData;
const getEntries = () => {
    return patients;
};
  
const addEntry = () => {
    return null;
};
  
export default {
    getEntries,
    addEntry
};