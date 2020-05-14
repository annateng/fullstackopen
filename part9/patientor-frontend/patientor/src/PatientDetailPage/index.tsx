import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue, addPatient } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import {Icon } from "semantic-ui-react";

const PatientDetailPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
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
    
    if (patients[params.id].ssn) setPatientDetails(patients[params.id]);
    else {
      getPatientDetails();
    }

  }, []); // eslint-disable-line

  if (patientDetails) {
    const genderIconName = patientDetails.gender === "male" ? "mars" : patientDetails.gender === "female" ? "venus" : "transgender alternate";

    return (
      <div>
        <h3>{patientDetails.name} <Icon name={genderIconName} /></h3>
        <div>ssn: {patientDetails.ssn}</div>
        <div>occupation: {patientDetails.occupation}</div>
      </div>
    )
  } else {
    return null;
  }
};

export default PatientDetailPage;