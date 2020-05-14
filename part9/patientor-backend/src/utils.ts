/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

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

const parseName = (name: any): string => {
  if (!name || !isString(name)) throw new Error('malformatted field: name');
  return name;
};

const parseDob = (dob: any): string => {
  if (!dob || !isString(dob) || !isDate(dob)) throw new Error('malformatted field: dateOfBirth');
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

const parseOccupation = (occupation: any) => {
  if (!occupation || !isString(occupation)) throw new Error('malformatted field: occupation');
  return occupation;
};

export const toNewPatient = (object: any): NewPatient => {
  const newPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDob(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };

  return newPatient;
};