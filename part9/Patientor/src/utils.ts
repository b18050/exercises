import { NewPatientEntry, Gender} from './types';

type Fields = {name: unknown, ssn: unknown, dateOfBirth: unknown, occupation: unknown, gender: unknown};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

export const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing comment');
    }
  
    return name;
}

export const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing comment');
    }
  
    return ssn;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
export const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

export const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing comment');
    }
  
    return occupation;
}

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

export const parseGender = (gender: unknown): Gender => {
    // console.log(gender);
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender)
    }
    return gender;
};

const toNewPatientEntry = ({ name, ssn, dateOfBirth, occupation, gender}: Fields ): NewPatientEntry => {

    const newEntry : NewPatientEntry = {
        name: parseName(name),
        ssn: parseSsn(ssn),
        dateOfBirth: parseDate(dateOfBirth),
        occupation: parseOccupation(occupation),
        gender: parseGender(gender)
    };

    return newEntry;
}

export default toNewPatientEntry;