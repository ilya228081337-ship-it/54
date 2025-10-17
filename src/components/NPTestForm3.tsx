import { Field, ErrorMessage } from 'formik';
import { FormGroup, Label } from 'reactstrap';

interface NPTestForm3Props {
  disabled?: boolean;
}

export const NPTestForm3 = ({ disabled = false }: NPTestForm3Props) => {
  return (
    <FormGroup>
      <Label for="email">Электронная почта</Label>
      <Field
        type="text"
        name="email"
        id="email"
        className="form-control"
        disabled={disabled}
      />
      <ErrorMessage name="email" component="div" className="text-danger mt-1" />
    </FormGroup>
  );
};
