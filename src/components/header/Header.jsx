import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-secondary bg-gradient">
        <Container>
          <Navbar.Brand href="#home">
            <h3>
              <strong>stockManager</strong>
            </h3>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
