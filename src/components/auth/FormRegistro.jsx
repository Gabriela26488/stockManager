import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
export const FormRegistro = () => {
  return (
    <Form action="#">
      <FloatingLabel controlId="correo" label="Correo" className="mb-3">
        <Form.Control
          type="email"
          name="correo"
          placeholder="Correo"
          className="bg-success-subtle"
        />
      </FloatingLabel>
      <Row>
        <Col xs={12} sm={6}>
          <FloatingLabel controlId="nombre" label="Nombre" className="mb-3">
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="bg-success-subtle"
            />
          </FloatingLabel>
        </Col>
        <Col xs={12} sm={6}>
          <FloatingLabel controlId="apellido" label="Apellido" className="mb-3">
            <Form.Control
              type="text"
              name="apellido"
              placeholder="Apellido"
              className="bg-success-subtle"
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row>
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
        <Col xs={12} sm={6}>
          <FloatingLabel
            controlId="repassword"
            label="Confirme Contraseña"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="repassword"
              placeholder="Confirme Contraseña"
              className="bg-success-subtle"
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Button type="submit" variant="success" className="mb-3 w-100">
        Registrarse
      </Button>
    </Form>
  );
};
