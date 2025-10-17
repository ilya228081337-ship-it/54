import * as Yup from 'yup';
import { NPWizard, NPPage } from '../components/NPWizard';
import { NPTestForm1 } from '../components/NPTestForm1';
import { NPTestForm2 } from '../components/NPTestForm2';
import { NPTestForm3 } from '../components/NPTestForm3';

const validationSchema1 = Yup.object({
  firstName: Yup.string().required('Обязательное поле'),
});

const validationSchema2 = Yup.object({
  lastName: Yup.string().required('Обязательное поле'),
});

const validationSchema3 = Yup.object({
  email: Yup.string().required('Обязательное поле'),
});

export const WizardPage = () => {
  const handleSubmit = (values: any[]) => {
    console.log('firstName:', values[0].firstName);
    console.log('lastName:', values[1].lastName);
    console.log('email:', values[2].email);
  };

  const handleCancel = () => {
    console.log('onCancel');
  };

  return (
    <NPWizard
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      title="Многостраничная форма (Wizard)"
    >
      <NPPage
        initialValues={{ firstName: '' }}
        validationSchema={validationSchema1}
        title="NPTestForm1"
      >
        <NPTestForm1 />
      </NPPage>
      <NPPage
        initialValues={{ lastName: '' }}
        validationSchema={validationSchema2}
        title="NPTestForm2"
      >
        <NPTestForm2 />
      </NPPage>
      <NPPage
        initialValues={{ email: '' }}
        validationSchema={validationSchema3}
        title="NPTestForm3"
      >
        <NPTestForm3 />
      </NPPage>
    </NPWizard>
  );
};
