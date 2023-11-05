import axios from "axios";
import { useState } from "react";
import {
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { url } from "../../backend";
import { useNavigate } from "react-router-dom";

export const FormLogin = () => {
  const [datos, setDatos] = useState({
    correo: "",
    password: "",
  });
  const [error, setError] = useState({ estado: false, msg: {} });
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    const formData = new FormData();
    const reCorreo = new RegExp(
      "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
    );

    let errores = {};

    if (datos.password.length == 0) {
      errores = { ...errores, password: `Debe introducir una contraseña` };
    }

    if (!reCorreo.test(datos.correo)) {
      errores = { ...errores, correo: `Debe introducir un email valido` };
    }

    if (Object.keys(errores).length !== 0) {
      setError({
        estado: true,
        msg: errores,
      });
      setCargando(false);
      Swal.fire({
        title: "Error!",
        icon: "error",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#6c757d",
      });
      return;
    } else {
      setError({
        estado: false,
        msg: {},
      });

      formData.append("correo", datos.correo);
      formData.append("password", datos.password);

      axios
        .post(`${url}/auth/login`, formData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          /* 
						la funcion "Swal.fire" viene de la libreria "sweetalert2"
						y nos sirve para manejar los mensajes de confirmacion
						y mostrarlos de una mejor forma en la interfaz
					*/
          new Promise((resolve) => {
            resolve(
              localStorage.setItem("token", JSON.stringify(res.data.token))
            );
          }).then(() => {
            navigate("/productos");
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: err.response.data.msg,
            confirmButtonText: "Continuar",
            confirmButtonColor: "#6c757d",
          });
        })
        .finally(() => {
          setCargando(false);
        });
    }
  };
  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Row>
        <Col xs={12} sm={6}>
          <FloatingLabel controlId="correo" label="Correo:" className="mb-3">
            <Form.Control
              type="email"
              name="correo"
              placeholder="Correo"
              className="bg-success-subtle"
              onChange={handleChange}
              isInvalid={error.msg.correo ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.msg.correo}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        <Col xs={12} sm={6}>
          <FloatingLabel
            controlId="password"
            label="Contraseña:"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="password"
              placeholder="Contraseña"
              className="bg-success-subtle"
              onChange={handleChange}
              isInvalid={error.msg.password ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.msg.password}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>

      <Button
        type="submit"
        variant="success"
        className="mb-3 w-100"
        disabled={cargando}
      >
        {cargando ? (
          <Spinner animation="border" variant="light" size="sm" />
        ) : (
          "Ingresar"
        )}
      </Button>
    </Form>
  );
};
