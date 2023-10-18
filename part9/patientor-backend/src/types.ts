import { v4 as uuidv4 } from 'uuid';

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    specialist: string;
    discharge: {
        date: string,
        criteria: string
    };
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName?: string;
    specialist: string;
    sickLeave?: {
        startDate: string,
        endDate: string
    };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

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

const parseEntry = (object: unknown): Entry | undefined => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing type of entry data');
    }
    if('type' in object){
        try {
            switch(object.type){
                case "Hospital":
                    return object as HospitalEntry;
                case "HealthCheck":
                    return object as HealthCheckEntry;
                case "OccupationalHealthcare":
                    return object as OccupationalHealthcareEntry;
                default:
                    throw new Error('Unrecognised entry type');
            }
        }
        catch(e){
            if(e instanceof Error){
                throw new Error('Error parsing entry' + e.message);
            }
        }
    }
    return;
};

const parseEntries = (object: unknown): Entry[] => {
    if (!(object && object instanceof Array)){
        throw new Error('Incorrect or missing type of entries data');
    }
    const entries = Array<Entry>();
    object.forEach((obj: unknown) => {
        const entry = parseEntry(obj);
        if(entry){
            entries.push(entry);
        }
    });
    return entries;
};

export const toPatient = (object: unknown): Patient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 
        'dateOfBirth' in object && 
        'ssn' in object && 
        'gender' in object && 
        'occupation' in object &&
        'entries' in object ){
        const patient: Patient = {
            id: 'id' in object? parseStringField(object.id, 'id'): uuidv4(),
            name: parseStringField(object.name, 'name'),
            dateOfBirth: parseStringField(object.dateOfBirth, 'dateOfBirth'),
            ssn: parseStringField(object.ssn, 'ssn'),
            gender: parseGenderField(object.gender),
            occupation: parseStringField(object.occupation, 'occupation'),
            entries: parseEntries(object.entries)
        };

        return patient;
    }
    throw new Error('Incorrect or missing fields');
};