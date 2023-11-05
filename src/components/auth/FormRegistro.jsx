import { useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Row,
  Col,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { url } from "../../backend";

export const FormRegistro = ({setRegistro}) => {
  const datosBase = {
    correo: "",
    nombre: "",
    apellido: "",
    password: "",
    repassword: "",
  };

  const [datos, setDatos] = useState(datosBase);
  const [error, setError] = useState({ estado: false, msg: {} });
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    const reCorreo = new RegExp(
      "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
    );
    const reTexto = new RegExp("^([Na-zA-ZáéíóúÁÉÍÓÚñÑ ]+)$");
    let errores = {};

    for (const [key, value] of Object.entries(datos)) {
      if (key !== "password" && key !== "repassword") {
        if (value.trim().length == 0) {
          errores = { ...errores, [key]: `Debe introducir un ${key} valido.` };
        }
      } else {
        if (value.length < 8) {
          errores = {
            ...errores,
            [key]: `La contraseña debe tener minimo 8 digitos.`,
          };
        }
      }

      if (key === "nombre" || key === "apellido") {
        if (!reTexto.test(value)) {
          errores = { ...errores, [key]: `Debe introducir un ${key} valido.` };
        }
      }
    }

    if (!reCorreo.test(datos.correo)) {
      errores = { ...errores, correo: `Debe introducir un correo valido` };
    }

    if (datos.password != datos.repassword) {
      errores = { ...errores, password: `Las contraseñas no coinciden.` };
      errores = { ...errores, repassword: `Las contraseñas no coinciden.` };
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
			const formData = new FormData();
			for (const [key, value] of Object.entries(datos)) {
				if (key != "repassword") {
					formData.append(key, value);
				}
			}

			axios
        .post(`${url}/auth/crearCuenta`, formData, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
					Swal.fire({
						title: 'Cuenta creada exitosamente!',
						icon: 'success',
						text: 'Inicie sesión para continuar.',
						confirmButtonText: 'Continuar',
						confirmButtonColor: '#6c757d'
					})
					setRegistro(false);
        })
        .catch((err) => {
					err.response.data.errors.map(i => {
						setError({
							estado: false,
							msg: {...error.msg, [i.param]: i.msg},
						});
					})
          Swal.fire({
            title: "Error!",
            icon: "error",
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
    <Form noValidate onSubmit={handleSubmit}>
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
      <Row>
        <Col xs={12} sm={6}>
          <FloatingLabel controlId="nombre" label="Nombre:" className="mb-3">
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="bg-success-subtle"
              onChange={handleChange}
              isInvalid={error.msg.nombre ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.msg.nombre}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
        <Col xs={12} sm={6}>
          <FloatingLabel
            controlId="apellido"
            label="Apellido:"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="apellido"
              placeholder="Apellido"
              className="bg-success-subtle"
              onChange={handleChange}
              isInvalid={error.msg.apellido ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.msg.apellido}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Col>
      </Row>

      <Row>
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
        <Col xs={12} sm={6}>
          <FloatingLabel
            controlId="repassword"
            label="Confirme Contraseña:"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="repassword"
              placeholder="Confirme Contraseña"
              className="bg-success-subtle"
              onChange={handleChange}
              isInvalid={error.msg.repassword ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.msg.repassword}
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
          "Registrarse"
        )}
      </Button>
    </Form>
  );
};
