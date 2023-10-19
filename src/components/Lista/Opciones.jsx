import { Col, Row, Form, Button, InputGroup } from "react-bootstrap";
import { BagPlus, Search } from "react-bootstrap-icons";
import { BotonModalCrear } from "./BotonModalCrear";

const Opciones = ({cargarProductos}) => {
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
          ></Form.Control>
          <Button variant="secondary">Buscar</Button>
        </InputGroup>
      </Col>
      <Col xs={12} sm={12} md={6}>
        <Row>
          <Col>
            <Form.Select>
              <option key="default">Categorias</option>
              {categorias.map((categoria, i) => (
                <option key={i}>{categoria}</option>
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
