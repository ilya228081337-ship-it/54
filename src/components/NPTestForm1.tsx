import { Field, ErrorMessage } from 'formik';
import { FormGroup, Label } from 'reactstrap';

interface NPTestForm1Props {
  disabled?: boolean;
}

export const NPTestForm1 = ({ disabled = false }: NPTestForm1Props) => {
  return (
    <FormGroup>
      <Label for="firstName">Имя</Label>
      <Field
        type="text"
        name="firstName"
        id="firstName"
        className="form-control"
        disabled={disabled}
      />
      <ErrorMessage name="firstName" component="div" className="text-danger mt-1" />
    </FormGroup>
  );
};
