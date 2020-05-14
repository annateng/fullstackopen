import { Patient } from '../src/types';
import { toNewPatient } from '../src/utils';

const data = 
  [
      {
          "id": "d2773336-f723-11e9-8f0b-362b9e155667",
          "name": "John McClane",
          "dateOfBirth": "1986-07-09",
          "ssn": "123-456-1111",
          "gender": "male",
          "occupation": "New york city copp"
      },
      {
          "id": "d2773598-f723-11e9-8f0b-362b9e155667",
          "name": "Martin Riggs",
          "dateOfBirth": "1979-01-30",
          "ssn": "000-111-0000",
          "gender": "male",
          "occupation": "Cop"
      },
      {
          "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
          "name": "Hans Gruber",
          "dateOfBirth": "1970-04-25",
          "ssn": "555-555-5555",
          "gender": "male",
          "occupation": "Technician"
      },
      {
          "id": "d2773822-f723-11e9-8f0b-362b9e155667",
          "name": "Dana Scully",
          "dateOfBirth": "1974-01-05",
          "ssn": "675-897-7888",
          "gender": "female",
          "occupation": "Forensic Pathologist"
      },
      {
          "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
          "name": "Matti Luukkainen",
          "dateOfBirth": "1971-04-09",
          "ssn": "111-222-3333",
          "gender": "male",
          "occupation": "Digital evangelist"
      }
  ];

  const patients: Patient[] = data.map(p => 
    {
      const patient = toNewPatient(p) as Patient;
      patient.id = p.id;
      patient.entries = [];
      return patient;
    }
  );

  export default patients;