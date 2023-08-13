import { v4 as uuidv4 } from 'uuid';

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (text: string): text is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(text);
};

const parseStringField = (field: unknown, name: string): string => {
    if (!isString(field) || field.length < 1){
        throw new Error(`Incorrect type or missing data for field ${name}`);
    }
    return field;
};

const parseGenderField = (field: unknown): Gender => {
    if(!isString(field) || !isGender(field)){
        throw new Error('Incorrect type or missing data for gender field');
    }
    return field;
};

export const toPatient = (object: unknown): Patient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 
        'dateOfBirth' in object && 
        'ssn' in object && 
        'gender' in object && 
        'occupation' in object ){
        const patient: Patient = {
            id: 'id' in object? parseStringField(object.id, 'id'): uuidv4(),
            name: parseStringField(object.name, 'name'),
            dateOfBirth: parseStringField(object.dateOfBirth, 'dateOfBirth'),
            ssn: parseStringField(object.ssn, 'ssn'),
            gender: parseGenderField(object.gender),
            occupation: parseStringField(object.occupation, 'occupation')
        };

        return patient;
    }
    throw new Error('Incorrect or missing fields');
};