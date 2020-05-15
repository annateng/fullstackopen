/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Type, NewEntry, Diagnose, HealthCheckRating, Entry, SickLeave, Discharge } from './types';

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isSsn = (ssn: string): boolean => {
  if (ssn.length != 12) return false;
  for (let i = 0; i < ssn.length; i++) {
    if (i == 3 || i == 7) { 
      if (ssn.charAt(i) !== '-') return false;
    } 
    else if (isNaN(Number(ssn.charAt(i)))) {
      return false;
    }
  }
  return true;
};

const isType = (type: any): type is Type => {
  console.log(Object.values(Type), type);
  return Object.values(Type).includes(type);
};

const isDCode = (code: any): code is Diagnose['code'] => {
  if (!isString(code)) return false;
  return /[A-Z]\d\d\.\d/.test(code);  // regex expression check for diagnosisCode
}

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
}

const isDischarge = (discharge: any): discharge is Discharge => {
  if (!discharge.date || !discharge.criteria || !isString(discharge.criteria) || !isDate(discharge.date)) return false;
  return true;
}

const parseString = (str: any): string => {
  if (!str || !isString(str)) throw new Error('malformatted field: string');
  return str;
};

const parseDate = (dob: any): string => {
  if (!dob || !isString(dob) || !isDate(dob)) throw new Error('malformatted field: date');
  return dob;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) throw new Error('malformatted field: ssn');
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) throw new Error('malformatted field: gender');
  return gender;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries) throw new Error('malformatted field: entries');
  entries.forEach((e: any) => { if (!isType(e.type)) throw new Error('malformatted field: entries') });
  return entries;
}

const parseDiagnosisCodes = (dCodes: any): Array<Diagnose['code']> => {
  if (!dCodes) throw new Error('malformatted field: diagnosisCodes');
  dCodes.forEach((dCode: any) => { if (!isDCode(dCode)) throw new Error('malformatted field: diagnosisCodes') });
  return dCodes;
}

const parseType = (type: any): Type => {
  if (!type || !isType(type)) throw new Error('malformatted field: type');
  return type;
}

const parseHealthCheckRating = (rating: any) => {
  if (!rating || !isHealthCheckRating(rating)) throw new Error('malformatted field: healthcheck rating');
  return rating;
}

const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) return undefined;
  if (!sickLeave.startDate || !sickLeave.endDate) throw new Error('malformatted field: sick leave');
  return sickLeave;
}

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) throw new Error('malformatted field: discharge');
  return discharge;
}


export const toNewEntry = (object: any): NewEntry => {
  let newEntry: NewEntry;
  const type = parseType(object.type);
  switch (type) {
    case Type.HealthCheck:
      newEntry = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
      break;
    case Type.OccupationalHealthcare:
      newEntry = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type,
        employerName: parseString(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave)
      };
      break;
    case Type.Hospital: 
      newEntry = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        type,
        discharge: parseDischarge(object.discharge)
      };
      break;
    default: return assertNever(type);
  }
  return newEntry;
}

export const toNewPatient = (object: any): NewPatient => {
  const newPatient = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: parseEntries(object.entries)
  };

  return newPatient;
};