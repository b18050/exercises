import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosesData;
const getEntries = () => {
    return diagnoses;
};
  
const addEntry = () => {
    return null;
};
  
export default {
    getEntries,
    addEntry
};