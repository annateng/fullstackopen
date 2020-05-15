import React from 'react';
import { Entry, Type } from '../types';
import { Segment, Icon } from "semantic-ui-react";
import { useStateValue } from "../state";

const assertNever = (item: never): never => {
  throw new Error(`unhandled discriminated union member: ${JSON.stringify(item)}`)
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();

  switch (entry.type) {
    case Type.HealthCheck: 
      return (
        <Segment.Group horizontal>
          <Icon name="heartbeat" size="huge" color="yellow" />
          <Segment color="yellow">
            <div><b>date:</b> {entry.date}</div>
            <div><b>description:</b> {entry.description}</div>
            <div><b>specialist:</b> {entry.specialist}</div>
            <div><b>health check rating:</b> {entry.healthCheckRating}</div>
            {entry.diagnosisCodes && <h5>diagnoses:</h5>}
            {entry.diagnosisCodes && entry.diagnosisCodes.map(dc => <li key={dc}>{dc}: {diagnoses[dc].name}</li>)}
          </Segment>
        </Segment.Group>
      )
    case Type.OccupationalHealthcare:
      return (
        <Segment.Group horizontal>
          <Icon size="huge" name="first aid" color="olive" />
          <Segment basic color="olive">
            <div><b>date:</b> {entry.date}</div>
            <div><b>description:</b> {entry.description}</div>
            <div><b>specialist:</b> {entry.specialist}</div>
            <div><b>employer name:</b> {entry.employerName}</div>
            {entry.sickLeave && <div><b>sick leave:</b> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</div>}
            {entry.diagnosisCodes && <h5>diagnoses:</h5>}
            {entry.diagnosisCodes && entry.diagnosisCodes.map(dc => <li key={dc}>{dc}: {diagnoses[dc].name}</li>)}
          </Segment>
        </Segment.Group>
      )
    case Type.Hospital:
      return (
        <Segment.Group horizontal>
          <Icon name="hospital" size="huge" color="violet" />
          <Segment color="violet">
            <div><b>date:</b> {entry.date}</div>
            <div><b>description:</b> {entry.description}</div>
            <div><b>specialist:</b> {entry.specialist}</div>
            <div><b>discharge:</b>
              <li>date: {entry.discharge.date}</li>
              <li>criteria: {entry.discharge.criteria}</li>
            </div>
            {entry.diagnosisCodes && <h5>diagnoses:</h5>}
            {entry.diagnosisCodes && entry.diagnosisCodes.map(dc => <li key={dc}>{dc}: {diagnoses[dc].name}</li>)}
          </Segment>
        </Segment.Group>
      )
    default: return assertNever(entry);
  }
}

export default EntryDetails;