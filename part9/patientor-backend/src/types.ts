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
    discharge: {
        date: string,
        criteria: string
    };
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName?: string;
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

const isNumber = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
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

const isRating = (number: number|string): number is HealthCheckRating => {
    if(isString(number)){
        number = parseInt(number);
    }
    return Object.values(HealthCheckRating).includes(number);
};

const parseRatingField = (field: unknown): HealthCheckRating => {
    if( (!isNumber(field) && !isString(field)) || !isRating(field)){
        throw new Error('Incorrect type or missing data for rating field');
    }
    return field;
};

const parseDiagnosisCodes = (field: unknown): Array<Diagnosis['code']> =>  {
    
    if ((!isString(field) && typeof field !== 'object')) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnosis['code']>;
    }
    if(isString(field)){
        return field.split(', ');
    }
    return field as Array<Diagnosis['code']>;
  };

const toHealthCheckEntry = (object: object, entry: Entry): HealthCheckEntry => {
    if('healthCheckRating' in object){
        return {
            ...entry,
            healthCheckRating: parseRatingField(object.healthCheckRating)
        } as HealthCheckEntry;
    }
    throw new Error('Missing fields in health check entry');
};

const toHospitalEntry = (object: object, entry: Entry): HospitalEntry => {
    if( 'discharge' in object &&
        typeof object.discharge === 'object' &&
        object.discharge &&
        'date' in object.discharge &&
        'criteria' in object.discharge){
        return {
            ...entry,
            discharge: {
                date: parseStringField(object.discharge.date, 'discharge.date'),
                criteria: parseStringField(object.discharge.date, 'discharge.criteria')
            }
        } as HospitalEntry;
    }
    throw new Error('Missing fields in hospital entry');
};

const toOccupationalHealthcareEntry = (object: object, entry: Entry): OccupationalHealthcareEntry => {
    let ohcEntry = { ...entry } as OccupationalHealthcareEntry;
    if('employerName' in object) {
        ohcEntry = {
            ...ohcEntry,
            employerName: parseStringField(object.employerName, 'employerName')
        };
    }
    if( 'sickLeave' in object &&
        typeof object.sickLeave === 'object' &&
        object.sickLeave &&
        'startDate' in object.sickLeave &&
        'endDate' in object.sickLeave){
        ohcEntry = {
            ...ohcEntry,
            sickLeave: {
                startDate: parseStringField(object.sickLeave.startDate, 'sickLeave.startDate'),
                endDate: parseStringField(object.sickLeave.endDate, 'sickLeave.endDate')
            }
        };
    }
    return ohcEntry;
};


export const toEntry = (object: unknown): Entry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing type of entry data');
    }
    if ('type' in object &&
    'description' in object && 
    'date' in object && 
    'specialist' in object ){
        try {
            let entry = {
                id: 'id' in object? parseStringField(object.id, 'id'): uuidv4(),
                description: parseStringField(object.description, 'name'),
                date: parseStringField(object.date, 'dateOfBirth'),
                specialist: parseStringField(object.specialist, 'ssn'),
                type: parseStringField(object.type, 'type'),
            } as Entry;
            if('diagnosisCodes' in object){
                entry = {
                    ...entry,
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
                };
            }
            switch(object.type){
                case "Hospital":
                    return toHospitalEntry(object, entry);
                case "HealthCheck":
                    return toHealthCheckEntry(object, entry);
                case "OccupationalHealthcare":
                    return toOccupationalHealthcareEntry(object, entry);
                default:
                    throw new Error('Unrecognised entry type');
            }
        }
        catch(e){
            if(e instanceof Error){
                throw new Error('Error parsing entry: ' + e.message);
            }
        }
    }
    throw new Error('Missing basic fields in entry');
};

const toEntries = (object: unknown): Entry[] => {
    if (!(object && object instanceof Array)){
        throw new Error('Incorrect or missing type of entries data');
    }
    const entries = Array<Entry>();
    object.forEach((obj: unknown) => {
        const entry = toEntry(obj);
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
            entries: toEntries(object.entries)
        };

        return patient;
    }
    throw new Error('Incorrect or missing fields');
};
