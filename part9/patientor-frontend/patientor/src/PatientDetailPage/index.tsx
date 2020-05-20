import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue, addPatient,  } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Gender, NewEntry } from "../types";
import { Icon, Button } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientDetailPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patientDetails, setPatientDetails] = React.useState<Patient | undefined>();
  const params = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const getPatientDetails = async() => {
    try {
      const { data: details } = await axios.get<Patient>(`${apiBaseUrl}/patients/${params.id}`);
      setPatientDetails(details);
      dispatch(addPatient(details));
    } catch (e) { 
      console.error(e); 
      setError(e.message);
    }
  };

  const submitNewEntry = async(values: NewEntry) => {
    const id = patientDetails?.id;

    try {
      const { data: updatedPatient } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(addPatient(updatedPatient));
      closeModal();
      getPatientDetails();
    } catch (e) { 
      console.error(e); 
      setError(e.message);
    }
  }

  React.useEffect(() => {
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
        {patientDetails.entries.map(e => <EntryDetails key={e.id} entry={e} />)}
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
      <Button onClick={() => {
        openModal();
      }}>Add New Entry</Button>
      </div>
    )
  } else {
    return null;
  }
};

export default PatientDetailPage;