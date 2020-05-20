import React from "react";
import { Grid, Button, Modal } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { NumberField } from "./FormField";
import { HealthCheckRating } from "../types";


export type HealthFormValues = { healthCheckRating: HealthCheckRating };

interface Props {
  onSubmit: (values: HealthFormValues) => void;
  onCancel: () => void;
  open: boolean
}

const HealthFormModal: React.FC<Props> = ({ open, onSubmit, onCancel }) => {
  return (
    <Modal open={open} centered={false}>
      <Modal.Content>
        <Formik
          initialValues={{
            healthCheckRating: HealthCheckRating.Healthy,
          }}
          onSubmit={onSubmit}
          validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
            return errors;
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="form ui">
                <Field
                  label="healthCheckRating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
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

export default HealthFormModal;
