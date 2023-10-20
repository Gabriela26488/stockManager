import { Button, Col, Form, Row } from "react-bootstrap";
import { url } from "../../backend";
import { useState } from "react";

export const Formulario = ({ datos, handleChange }) => {
  const categorias = [
    "",
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


  const editar = datos._id ? true : false;

  return (
    <>
      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>
          <strong>Nombre:</strong>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Nombre del producto"
          name="nombre"
          value={datos.nombre}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="precio">
        <Form.Label>
          <strong>Precio:</strong>
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="000$"
          min={1}
          name="precio"
          value={datos.precio}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="cantidad">
        <Form.Label>
          <strong>Cantidad:</strong>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Cantidad inicial"
          min={1}
          name="cantidad"
          value={datos.cantidad}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="categoria">
        <Form.Label>
          <strong>Categoria:</strong>
        </Form.Label>
        <Form.Select name="categoria" onChange={handleChange} defaultValue={editar ? datos.categoria : ""}>
          {categorias.map((categoria, i) => (
            <option
              key={i}
              value={categoria}
              className="text-capitalize"
            >
              {categoria}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="imagen" className="mb-3">
        <Form.Label>
          <strong>Imagen:</strong>
        </Form.Label>
        <Form.Control
          type="file"
          accept=".jpg, .jpeg"
          name="imagen"
          onChange={handleChange}
        />
        <Form.Text muted>Solo se permiten archivos JPG</Form.Text>
      </Form.Group>
      <Form.Group controlId="descripcion" className="mb-3">
        <Form.Label>
          <strong>Descripción:</strong>
        </Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Una breve descripción"
          style={{ maxHeight: "120px" }}
          name="descripcion"
          value={datos.descripcion}
          onChange={handleChange}
        />
      </Form.Group>
    </>
  );
};
