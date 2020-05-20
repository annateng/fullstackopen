import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';
import HospitalFormModal, { HospitalFormValues} from './HospitalFormModal';
import HealthFormModal, { HealthFormValues } from './HealthFormModal';
import OccupationalFormModal, { OccupationalFormValues } from './OccupationalFormModal';
import { Type, NewEntry } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const assertNever = (value: never): never => {
  throw new Error(`unhandled discriminated union member: ${JSON.stringify(value)}`);
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  // const [entryDetails, setEntryDetails] = React.useState<NewEntry | undefined>();
  const [baseEntryDetails, setBaseEntryDetails] = React.useState<EntryFormValues>();
  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
  const [healthModalOpen, setHealthModalOpen] = React.useState<boolean>(false);
  const [occupationalModalOpen, setOccupationalModalOpen] = React.useState<boolean>(false);

  const entryFormSubmit = async(values: EntryFormValues) => {
    setBaseEntryDetails({...values});
    switch (values.type) {
      case Type.Hospital:
        setHospitalModalOpen(true);
        break;
      case Type.HealthCheck:
        setHealthModalOpen(true);
        break;
      case Type.OccupationalHealthcare:
        setOccupationalModalOpen(true);
        break;
      default: return assertNever(values.type);
    }
    
  }
  
  const hospitalFormSubmit = async(values: HospitalFormValues) => {
    const typeHospital: Type.Hospital = Type.Hospital;
    if (baseEntryDetails) {
      const entryDetails = {
        ...baseEntryDetails,
        discharge: values,
        type: typeHospital
      };
      onSubmit(entryDetails);
    } else { 
      console.error('Base Entry Form Details Not Saved'); 
    }
    setHospitalModalOpen(false);
  }

  const healthFormSubmit = async(values: HealthFormValues) => {
    const typeHealthCheck: Type.HealthCheck = Type.HealthCheck;
    if (baseEntryDetails) {
      const entryDetails = {
        ...baseEntryDetails,
        healthCheckRating: values.healthCheckRating,
        type: typeHealthCheck
      };
      onSubmit(entryDetails);
    } else { 
      console.error('Base Entry Form Details Not Saved'); 
    }
    setHealthModalOpen(false);
  }

  const occupationalFormSubmit = async(values: OccupationalFormValues) => {
    const typeOccupational: Type.OccupationalHealthcare = Type.OccupationalHealthcare;
    if (baseEntryDetails) {
      const entryDetails = {
        ...baseEntryDetails,
        employerName: values.employerName,
        sickLeave: values.startDate && values.endDate ? { startDate: values.startDate, endDate: values.endDate } : undefined,
        type: typeOccupational
      };
      onSubmit(entryDetails);
    } else { 
      console.error('Base Entry Form Details Not Saved'); 
    }
    setOccupationalModalOpen(false);
  }

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={entryFormSubmit} onCancel={onClose} />
      </Modal.Content>
      <Modal.Actions>
        <HospitalFormModal open={hospitalModalOpen} onSubmit={hospitalFormSubmit} onCancel={() => setHospitalModalOpen(false)} />
        <HealthFormModal open={healthModalOpen} onSubmit={healthFormSubmit} onCancel={() => setHealthModalOpen(false)} />
        <OccupationalFormModal open={occupationalModalOpen} onSubmit={occupationalFormSubmit} onCancel={() => setOccupationalModalOpen(false)} />
      </Modal.Actions>
    </Modal>
  )
};

export default AddEntryModal;
