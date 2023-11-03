import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/StocKManager.png";
import { Button, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { List } from "react-bootstrap-icons";
import { Menu } from "./Menu";

/* 
  el componente "Header" se utuliza como banner, asi como
  tambien para mostrar las opciones de filtrado y el boton
  para agreagar un producto
*/
const Header = () => {
  const [offcanvas, setShowOffcanvas] = useState(false);
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <>
      <Navbar expand="lg" className="bg-success bg-gradient">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="logo" style={{ height: "100px" }} />
          </Navbar.Brand>
          <Button variant="outline-light" className="py-1" onClick={handleShow}>
            <h4><List className="mt-1"/></h4>
          </Button>
        </Container>
      </Navbar>

      <Menu show={offcanvas} handleClose={handleClose} />
    </>
  );
};

export default Header;
