import React from "react";
import { Grid, Button, Modal } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "./FormField";
import { Discharge } from "../types";


export type HospitalFormValues = Discharge;

interface Props {
  onSubmit: (values: HospitalFormValues) => void;
  onCancel: () => void;
  open: boolean
}

const HospitalFormModal: React.FC<Props> = ({ open, onSubmit, onCancel }) => {
  return (
    <Modal open={open} centered={false}>
      <Modal.Content>
        <Formik
          initialValues={{
            date: '',
            criteria: '',
          }}
          onSubmit={onSubmit}
          validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.date) {
              errors.date = requiredError;
            }
            if (!values.criteria) {
              errors.criteria = requiredError;
            }
            return errors;
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="form ui">
                <Field
                  label="Discharge date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Discharge criteria"
                  placeholder="Discharge criteria"
                  name="criteria"
                  component={TextField}
                />
                <Grid>
                  <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                      Cancel
                    </Button>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <Button
                      type="submit"
                      floated="right"
                      color="green"
                      disabled={!isValid}
                    >
                      Submit
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

export default HospitalFormModal;
