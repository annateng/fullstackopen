import patientData from '../../data/patients';
import { Patient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Pick<Patient, 'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'>[] => {
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

export default { getPatients };

