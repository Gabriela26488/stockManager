import { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

export const Buscar = () => {
  const [nombre, setNombre] = useState("");
  return (
    <InputGroup>
      <Form.Control
        placeholder="Nombre del Producto"
        aria-label="Nombre del Producto"
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      ></Form.Control>
      <Button variant="success">
        <Search />
      </Button>
    </InputGroup>
  );
};
