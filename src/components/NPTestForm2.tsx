import { Field, ErrorMessage } from 'formik';
import { FormGroup, Label } from 'reactstrap';

interface NPTestForm2Props {
  disabled?: boolean;
}

export const NPTestForm2 = ({ disabled = false }: NPTestForm2Props) => {
  return (
    <FormGroup>
      <Label for="lastName">Фамилия</Label>
      <Field
        type="text"
        name="lastName"
        id="lastName"
        className="form-control"
        disabled={disabled}
      />
      <ErrorMessage name="lastName" component="div" className="text-danger mt-1" />
    </FormGroup>
  );
};
