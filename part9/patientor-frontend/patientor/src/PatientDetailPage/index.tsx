import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue, addPatient } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Gender } from "../types";
import { Icon } from "semantic-ui-react";

const PatientDetailPage: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [patientDetails, setPatientDetails] = React.useState<Patient | undefined>();
  const params = useParams<{ id: string }>();

  React.useEffect(() => {
    const getPatientDetails = async() => {
      try {
        const { data: details } = await axios.get<Patient>(`${apiBaseUrl}/patients/${params.id}`);
        setPatientDetails(details);
        dispatch(addPatient(details));
      } catch (e) { console.error(e); }
    };

    if (patients[params.id] && patients[params.id].ssn) setPatientDetails(patients[params.id]);
    else {
      getPatientDetails();
    }

  }, []); // eslint-disable-line

  if (patientDetails) {
    const genderIconName = patientDetails.gender === Gender.Male ? "mars" : patientDetails.gender === Gender.Female ? "venus" : "transgender alternate";

    return (
      <div>
        <h3>{patientDetails.name} <Icon name={genderIconName} /></h3>
        <div>ssn: {patientDetails.ssn}</div>
        <div>occupation: {patientDetails.occupation}</div>
        <h4>entries:</h4>
        {patientDetails.entries.map(e => (
            <div key={e.id}>
              {e.date}: {e.description}
              {e.diagnosisCodes && e.diagnosisCodes.map(dc => <li key={dc}>{dc} {diagnoses[dc].name}</li>)}
            </div>
          ))}
      </div>
    )
  } else {
    return null;
  }
};

export default PatientDetailPage;