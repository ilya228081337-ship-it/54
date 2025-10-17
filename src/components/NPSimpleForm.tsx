import { useState, cloneElement, ReactElement } from 'react';
import { Formik, Form } from 'formik';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { NPCancelButton } from './NPCancelButton';
import { NPSubmitButton } from './NPSubmitButton';

interface NPSimpleFormProps {
  isReadOnly: boolean;
  isEdit: boolean;
  initialValues: any;
  onSubmit: (values: any) => void;
  onCancel: () => void;
  validationSchema: any;
  title: string;
  children: ReactElement;
}

export const NPSimpleForm = ({
  isReadOnly,
  isEdit: initialIsEdit,
  initialValues,
  onSubmit,
  onCancel,
  validationSchema,
  title,
  children,
}: NPSimpleFormProps) => {
  const [isEdit, setIsEdit] = useState(initialIsEdit);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSubmit = (values: any) => {
    onSubmit(values);
    setIsEdit(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsEdit(false);
  };

  const isFormDisabled = isReadOnly || !isEdit;

  return (
    <Card>
      <CardHeader>
        <h4>{title}</h4>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ submitForm }) => (
            <Form>
              <div className="mb-3">
                {cloneElement(children, { disabled: isFormDisabled })}
              </div>
              <div className="d-flex">
                <NPCancelButton onClick={handleCancel} label="Отмена" />
                {!isReadOnly && (
                  <>
                    {isEdit ? (
                      <NPSubmitButton onClick={submitForm} label="Сохранить" />
                    ) : (
                      <NPSubmitButton onClick={handleEdit} label="Изменить" />
                    )}
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};
