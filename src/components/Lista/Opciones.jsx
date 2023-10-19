import { Col, Row, Form, Button, InputGroup } from "react-bootstrap";
import { BagPlus, Search } from "react-bootstrap-icons";
import { BotonModalCrear } from "./BotonModalCrear";
import { useState } from "react";

const Opciones = ({cargarProductos, buscarNombre, buscarCategoria}) => {
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

  const [nombre, setNombre] = useState("")

  function handleCategoria(categoria) {
    buscarCategoria(categoria);
  }
  return (
    <Row>
      <Col xs={12} sm={12} md={6} className="mb-3">
        <InputGroup>
          <InputGroup.Text>
            <Search />
          </InputGroup.Text>
          <Form.Control
            placeholder="Nombre del Producto"
            aria-label="Nombre del Producto"
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          ></Form.Control>
          <Button variant="secondary" onClick={() => buscarNombre(nombre)} >Buscar</Button>
        </InputGroup>
      </Col>
      <Col xs={12} sm={12} md={6}>
        <Row>
          <Col>
            <Form.Select onChange={e => handleCategoria(e.target.value)}>
              <option key="default" value="">Categorias</option>
              {categorias.map((categoria, i) => (
                <option key={i} value={categoria} className="text-capitalize">{categoria}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <BotonModalCrear cargarProductos={cargarProductos} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Opciones;
