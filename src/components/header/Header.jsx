import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Opciones from "../Lista/Opciones";
import { Col, Row } from "react-bootstrap";

const Header = ({ cargarProductos, buscarNombre, buscarCategoria }) => {
  return (
    <>
      <Navbar expand="lg" className="bg-success bg-gradient">
        <Container>
          <Navbar.Brand href="#home">
            <h3>
              <strong>stockManager</strong>
            </h3>
          </Navbar.Brand>
          <div className="mt-2 w-100">
            <Row>
              <Col xs={12} lg={{span: 10, offset: 2}}>
                <Opciones
                  cargarProductos={cargarProductos}
                  buscarNombre={buscarNombre}
                  buscarCategoria={buscarCategoria}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
