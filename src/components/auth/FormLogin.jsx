import { useState } from "react";
import {
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { url } from "../../backend";

/* 
  en el componente FormLogin es el formulario donde el usuario podra loguearse
*/
export const FormLogin = () => {
  // en el estado datos se guardan los valores para el correo y la contraseña
  const [datos, setDatos] = useState({
    correo: "",
    password: "",
  });
  // con el estado de error manejaremos los errores de una forma dinamica
  const [error, setError] = useState({ estado: false, msg: {} });
  // con el estado cargando muestra un loader cuando se haga una consulta al backend
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    const formData = new FormData();
    // la variable reCorreo guarda una expresion regular para hacer la validacion del correo
    const reCorreo = new RegExp(
      "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
    );

    // en la variable errores guardamos los errres que se produscan
    let errores = {};

    if (datos.password.length == 0) {
      errores = { ...errores, password: `Debe introducir una contraseña` };
    }

    if (!reCorreo.test(datos.correo)) {
      errores = { ...errores, correo: `Debe introducir un email valido` };
    }

    /* 
      revisamos la variable errores, en el caso de existir alguno enviaremos
      un mensaje de error con sweetAlert y guardaremos los errores en el estado de 
      error. De lo contrario procedemos a realizar la consulta al backend
    */

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
            si el  loguin es exitoso procedomos a guardar los datos del usuario en el
            localStorage luego de verificar sus datos
          */
          const token = res.data.token;
          axios
            .get(`${url}/usuarios/verificar/usuario`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
              const datosUsuario = res.data;
              localStorage.setItem("token", JSON.stringify(token));
              localStorage.setItem("usuario", JSON.stringify(datosUsuario));
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
