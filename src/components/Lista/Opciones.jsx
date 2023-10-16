import { Col, Row, Form, Button, InputGroup } from "react-bootstrap";
import { BagPlus, Search } from "react-bootstrap-icons";

const Opciones = () => {
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
          <Button variant="secondary">Button</Button>
        </InputGroup>
      </Col>
      <Col xs={12} sm={12} md={6}>
        <Row>
          <Col>
            <Form.Select>
              <option value="0" selected>
                Categorias
              </option>
              <option value="1">Categoría 1</option>
              <option value="2">Categoría 2</option>
              <option value="3">Categoría 3</option>
              <option value="3">Categoría 4</option>
            </Form.Select>
          </Col>
          <Col>
          <Button variant="success" className="w-100"><BagPlus /> Agregar</Button></Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Opciones;
