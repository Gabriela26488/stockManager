import { Form, FloatingLabel, Button, Row, Col } from "react-bootstrap";

export const FormLogin = () => {
  return (
    <Form action="#">
      <Row>
        <Col xs={12} sm={6}>
          <FloatingLabel controlId="correo" label="Correo" className="mb-3">
            <Form.Control
              type="email"
              name="correo"
              placeholder="Correo"
              className="bg-success-subtle"
            />
          </FloatingLabel>
        </Col>
        <Col xs={12} sm={6}>
          <FloatingLabel
            controlId="password"
            label="Contraseña"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              placeholder="Contraseña"
              className="bg-success-subtle"
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Button type="submit" variant="success" className="mb-3 w-100">
        Ingresar
      </Button>
    </Form>
  );
};
