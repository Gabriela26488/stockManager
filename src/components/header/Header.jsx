import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Col, Row } from "react-bootstrap";
import Opciones from "../Lista/Opciones";
import logo from "../../assets/StocKManager.png"

/* 
  el componente "Header" se utuliza como banner, asi como
  tambien para mostrar las opciones de filtrado y el boton
  para agreagar un producto
*/
const Header = ({ cargarProductos, buscarNombre, buscarCategoria }) => {
  return (
    <>
      <Navbar expand="lg" className="bg-success bg-gradient">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="logo" style={{height: "100px"}} />
          </Navbar.Brand>
          <div className="mt-3 w-100">
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
