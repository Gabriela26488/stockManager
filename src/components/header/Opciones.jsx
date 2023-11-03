import { Col, Row, Form, Button, InputGroup, Dropdown } from "react-bootstrap";
import { GearFill, PersonFill, Search, StarFill } from "react-bootstrap-icons";
import { useState } from "react";
import { OpcionesUsuario } from "./OpcionesUsuario";

const Opciones = () => {
  const categorias = [
    "carniceria",
    "pescaderia",
    "charcuteria",
    "frutas",
    "verduras",
    "bebidas",
    "golosinas",
    "enlatados",
    "viveres",
    "postres",
  ];

  const [hover, setHover] = useState(false);

  const [nombre, setNombre] = useState("");

  const rol = "admin";

  function handleCategoria(categoria) {
    return;
  }
  return (
    <Row>
      <Col xs={12} sm={12} md={6} className="mb-3">
        <InputGroup>
          <Form.Control
            placeholder="Nombre del Producto"
            aria-label="Nombre del Producto"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          ></Form.Control>
          <Button
            onClick={() => buscarNombre(nombre)}
            variant={hover ? "success" : "outline-light"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <Search />
          </Button>
        </InputGroup>
      </Col>
      <Col xs={12} sm={12} md={6}>
        <Row>
          <Col>
            <Form.Select onChange={(e) => handleCategoria(e.target.value)}>
              <option key="default" value="">
                Categorias
              </option>
              {categorias.map((categoria, i) => (
                <option key={i} value={categoria} className="text-capitalize">
                  {categoria}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col className="d-flex justify-content-end">
            {rol == "admin" ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    className="rounded rounded-circle p-2"
                  >
                    <GearFill />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Perfil</Dropdown.Item>
                    <Dropdown.Item href="#">Usuarios</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <OpcionesUsuario />
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Opciones;
