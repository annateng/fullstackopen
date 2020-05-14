import patientData from '../../data/patients';
import { Patient, NewPatient } from '../types';

const patients: Patient[] = patientData;

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

export default { getPatients, getNonsensitivePatients, addPatient, getPatient };

