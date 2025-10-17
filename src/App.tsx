import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Nav, NavItem, NavLink as RSNavLink } from 'reactstrap';
import { SimpleFormPage } from './pages/SimpleFormPage';
import { TabbedFormPage } from './pages/TabbedFormPage';
import { WizardPage } from './pages/WizardPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col md={3} className="bg-light p-4">
            <h5 className="mb-4">Меню</h5>
            <Nav vertical>
              <NavItem>
                <RSNavLink tag={Link} to="/simple" className="text-dark">
                  Простая форма
                </RSNavLink>
              </NavItem>
              <NavItem>
                <RSNavLink tag={Link} to="/tabbed" className="text-dark">
                  Форма с вкладками
                </RSNavLink>
              </NavItem>
              <NavItem>
                <RSNavLink tag={Link} to="/wizard" className="text-dark">
                  Многостраничная форма (Wizard)
                </RSNavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md={9} className="p-4">
            <Routes>
              <Route path="/simple" element={<SimpleFormPage />} />
              <Route path="/tabbed" element={<TabbedFormPage />} />
              <Route path="/wizard" element={<WizardPage />} />
              <Route path="/" element={
                <div className="text-center mt-5">
                  <h4>Выберите форму из меню</h4>
                </div>
              } />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
