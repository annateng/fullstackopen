import React from "react";
import { Grid, Button, Modal } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "./FormField";

export type OccupationalFormValues = {
  employerName: string;
  startDate?: string;
  endDate?: string
}

interface Props {
  onSubmit: (values: OccupationalFormValues) => void;
  onCancel: () => void;
  open: boolean
}

const OccupationalFormModal: React.FC<Props> = ({ open, onSubmit, onCancel }) => {
  return (
    <Modal open={open} centered={false}>
      <Modal.Content>
        <Formik
          initialValues={{
            employerName: '',
            startDate: '',
            endDate:''
          }}
          onSubmit={onSubmit}
          validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            return errors;
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="form ui">
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Start Date"
                  placeholder="YYYY-MM-DD"
                  name="startDate"
                  component={TextField}
                />
                <Field
                  label="End Date"
                  placeholder="YYYY-MM-DD"
                  name="endDate"
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

export default OccupationalFormModal;
