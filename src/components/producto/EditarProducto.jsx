import { useState } from "react";
import { Alert, Spinner, Form, Row, Col, Button } from "react-bootstrap";
import { Formulario } from "../Utilidades/Formulario";
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../../backend";

export const EditarProducto = ({ onHide, valores, cargarProductos }) => {
  const [datos, setDatos] = useState({
    _id: valores._id,
    nombre: valores.nombre,
    descripcion: valores.descripcion,
    precio: valores.precio,
    cantidad: valores.cantidad,
    categoria: valores.categoria,
    imagen: "",
  });

  const [error, setError] = useState({
    estado: false,
    msg: null,
  });

  const [cargando, setCargando] = useState(false);

  function handleChange(e) {
    if (e.target.name === "imagen") {
      setDatos({ ...datos, [e.target.name]: e.target.files[0] });
    } else {
      setDatos({ ...datos, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    Swal.fire({
      title: "Estas seguro de editar los datos de este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ffc107",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Si, editar",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setCargando(true);
        const formData = new FormData();
        const errores = [];

        for (const [key, value] of Object.entries(datos)) {
          if (key !== "imagen" && key !== "_id") {
            if (value.toString().trim().length == 0) {
              errores.push({ msg: `El campo ${key.toUpperCase()} esta Vacío` });
            } else {
              formData.append(key, value);
            }
          }
        }

        if (errores.length > 0) {
          setError({ estado: true, msg: errores });
          Swal.fire({
            title: "Error!",
            icon: "error",
            confirmButtonText: "Continuar",
            confirmButtonColor: "#28a745",
          });
          setCargando(false);
          return;
        }

        await axios
          .put(`${url}/productos/${valores._id}`, formData, {
            headers: { "Content-Type": "application/json" },
          })
          .then(async () => {
            if (datos.imagen !== "") {
              const imagen = new FormData();
              imagen.append("imagen", datos.imagen);

              await axios.put(`${url}/productos/imagen/${valores._id}`, imagen);
            }
            Swal.fire({
              title: "Hecho!",
              icon: "success",
              text: "El producto ha sido editado.",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#28a745",
            });
            onHide();
          })
          .catch((err) => {
            setError({ estado: true, msg: err.response.data.errors });
            Swal.fire({
              title: "Error!",
              icon: "error",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#6c757d",
            });
          })
          .finally(() => {
            setCargando(false);
            cargarProductos();
          });
      }
    });
  }
  return (
    <>
      {error.estado ? (
        <Alert variant="danger">
          <strong>ERROR:</strong>
          <ul>
            {error.msg.map((mensaje, i) => (
              <li key={i}> {mensaje.msg}</li>
            ))}
          </ul>
        </Alert>
      ) : (
        ""
      )}
      {cargando ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Formulario datos={datos} handleChange={handleChange} />
          <Row xs="auto">
            <Col className="ms-auto">
              <Button type="submit" variant="warning" className="me-3">
                Editar
              </Button>
              <Button onClick={onHide} variant="danger">
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};
