import patientData from '../../data/patients';
import { Patient, NewPatient, NewEntry, Entry } from '../types';

let patients: Patient[] = patientData;

const getNonsensitivePatients = (): Pick<Patient, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>[] => {
  return patients.map(p => {
    return {
      id: p.id,
      name: p.name,
      dateOfBirth: p.dateOfBirth,
      gender: p.gender,
      occupation: p.occupation
    };
  });
};

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
}

const addPatient = (np: NewPatient): Patient => {
  const patient = {...np, id: Math.floor(Math.random() * 1000000).toString() };
  patients.push(patient);
  return patient;
};

const addEntry = (patientId: string, entry: NewEntry): Patient | undefined => {
  const patient = patients.find(p => p.id === patientId);
  if (!patient) return undefined;

  const newEntry: Entry = {
    ...entry,
    id: Math.floor(Math.random() * 1000000).toString()
  };

  patient.entries.push(newEntry);
  patients = [...patients.filter(p => p.id !== patientId), patient];

  return patient;
}

export default { getPatients, getNonsensitivePatients, addPatient, getPatient, addEntry };

