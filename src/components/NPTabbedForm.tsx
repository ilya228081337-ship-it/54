import { useState, Children, ReactElement, cloneElement } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { Card, CardBody, CardHeader, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { NPCancelButton } from './NPCancelButton';
import { NPSubmitButton } from './NPSubmitButton';

interface TabProps {
  initialValues: any;
  validationSchema: any;
  title: string;
  children: ReactElement;
}

interface NPTabbedFormProps {
  isReadOnly: boolean;
  isEdit: boolean;
  onSubmit: (values: any[]) => void;
  onCancel: () => void;
  title: string;
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
}

export const NPTabbedForm = ({
  isReadOnly,
  isEdit: initialIsEdit,
  onSubmit,
  onCancel,
  title,
  children,
}: NPTabbedFormProps) => {
  const [isEdit, setIsEdit] = useState(initialIsEdit);
  const [activeTab, setActiveTab] = useState(0);
  const childrenArray = Children.toArray(children) as ReactElement<TabProps>[];
  const [tabValues, setTabValues] = useState<any[]>(
    childrenArray.map((child) => child.props.initialValues)
  );

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleTabChange = async (newTab: number, validateForm: () => Promise<any>, values: any) => {
    if (isEdit) {
      const errors = await validateForm();
      if (Object.keys(errors).length === 0) {
        const newTabValues = [...tabValues];
        newTabValues[activeTab] = values;
        setTabValues(newTabValues);
        setActiveTab(newTab);
      }
    } else {
      setActiveTab(newTab);
    }
  };

  const handleSubmit = async (values: any) => {
    const newTabValues = [...tabValues];
    newTabValues[activeTab] = values;
    onSubmit(newTabValues);
    setIsEdit(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsEdit(false);
    setActiveTab(0);
    setTabValues(childrenArray.map((child) => child.props.initialValues));
  };

  const currentChild = childrenArray[activeTab];
  const isFormDisabled = isReadOnly || !isEdit;

  return (
    <Card>
      <CardHeader>
        <h4>{title}</h4>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={tabValues[activeTab]}
          validationSchema={currentChild.props.validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
          key={activeTab}
        >
          {({ submitForm, values, validateForm }) => (
            <Form>
              <Nav tabs>
                {childrenArray.map((child, index) => (
                  <NavItem key={index}>
                    <NavLink
                      className={activeTab === index ? 'active' : ''}
                      onClick={() => handleTabChange(index, validateForm, values)}
                      style={{ cursor: 'pointer' }}
                    >
                      {child.props.title}
                    </NavLink>
                  </NavItem>
                ))}
              </Nav>

              <TabContent activeTab={activeTab}>
                {childrenArray.map((child, index) => (
                  <TabPane tabId={index} key={index}>
                    {activeTab === index && (
                      <div className="mt-3 mb-3">
                        {cloneElement(child.props.children, { disabled: isFormDisabled })}
                      </div>
                    )}
                  </TabPane>
                ))}
              </TabContent>

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

export const NPTab = ({ children }: { children: ReactElement; initialValues: any; validationSchema: any; title: string }) => {
  return <>{children}</>;
};
