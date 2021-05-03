import diagnosesData from '../../data/diagnoses.json';
import { DiagnosisEntry } from '../types';

const diagnoses: Array<DiagnosisEntry> = diagnosesData;
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