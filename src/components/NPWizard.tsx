import { useState, Children, ReactElement, cloneElement } from 'react';
import { Formik, Form } from 'formik';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { NPCancelButton } from './NPCancelButton';
import { NPSubmitButton } from './NPSubmitButton';

interface PageProps {
  initialValues: any;
  validationSchema: any;
  title: string;
  children: ReactElement;
}

interface NPWizardProps {
  onSubmit: (values: any[]) => void;
  onCancel: () => void;
  title: string;
  children: ReactElement<PageProps> | ReactElement<PageProps>[];
}

export const NPWizard = ({
  onSubmit,
  onCancel,
  title,
  children,
}: NPWizardProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const childrenArray = Children.toArray(children) as ReactElement<PageProps>[];
  const [pageValues, setPageValues] = useState<any[]>(
    childrenArray.map((child) => child.props.initialValues)
  );

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === childrenArray.length - 1;

  const handleNext = async (values: any, validateForm: () => Promise<any>) => {
    const errors = await validateForm();
    if (Object.keys(errors).length === 0) {
      const newPageValues = [...pageValues];
      newPageValues[currentPage] = values;
      setPageValues(newPageValues);
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = (values: any) => {
    const newPageValues = [...pageValues];
    newPageValues[currentPage] = values;
    setPageValues(newPageValues);
    setCurrentPage(currentPage - 1);
  };

  const handleSubmit = async (values: any) => {
    const newPageValues = [...pageValues];
    newPageValues[currentPage] = values;
    onSubmit(newPageValues);
  };

  const handleCancel = () => {
    onCancel();
    setCurrentPage(0);
    setPageValues(childrenArray.map((child) => child.props.initialValues));
  };

  const currentChild = childrenArray[currentPage];

  return (
    <Card>
      <CardHeader>
        <h4>{title}</h4>
        <h5 className="text-muted mt-2">{currentChild.props.title}</h5>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={pageValues[currentPage]}
          validationSchema={currentChild.props.validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
          key={currentPage}
        >
          {({ submitForm, values, validateForm }) => (
            <Form>
              <div className="mb-3">
                {cloneElement(currentChild.props.children, { disabled: false })}
              </div>

              <div className="d-flex">
                <NPCancelButton onClick={handleCancel} label="Отмена" />
                {!isFirstPage && (
                  <NPCancelButton onClick={() => handleBack(values)} label="Назад" />
                )}
                {isLastPage ? (
                  <NPSubmitButton onClick={submitForm} label="Сохранить" />
                ) : (
                  <NPSubmitButton onClick={() => handleNext(values, validateForm)} label="Далее" />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export const NPPage = ({ children }: { children: ReactElement; initialValues: any; validationSchema: any; title: string }) => {
  return <>{children}</>;
};
