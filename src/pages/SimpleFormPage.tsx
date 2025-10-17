import * as Yup from 'yup';
import { NPSimpleForm } from '../components/NPSimpleForm';
import { NPTestForm1 } from '../components/NPTestForm1';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Обязательное поле'),
});

export const SimpleFormPage = () => {
  const handleSubmit = (values: any) => {
    console.log('firstName:', values.firstName);
  };

  const handleCancel = () => {
    console.log('onCancel');
  };

  return (
    <NPSimpleForm
      isReadOnly={false}
      isEdit={false}
      initialValues={{ firstName: '' }}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      validationSchema={validationSchema}
      title="Простая форма"
    >
      <NPTestForm1 />
    </NPSimpleForm>
  );
};
