import axios from "axios";
import { useState } from "react";
import { FloatingLabel, Modal, Form, Spinner, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { url } from "../../backend";

export const CrearUsuario = ({ show, onHide, cargaUsuarios, usuario }) => {
  const datosVacios = {
    correo: "",
    nombre: "",
    apellido: "",
    password: "",
    repassword: "",
    telefono: "",
  };
  const datosBase = usuario
    ? {
        correo: usuario.correo,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono ? usuario.telefono : "",
      }
    : datosVacios;

  const opcion = usuario ? "editar" : "crear";

  const [datos, setDatos] = useState(datosBase);
  const [error, setError] = useState({ estado: false, msg: {} });
  const [cargando, setCargando] = useState(false);
  const [configurarPassword, setConfigurarPassword] = useState(
    opcion == "crear" ? true : false
  );

  const cerrarModal = () => {
    setDatos(datosBase);
    setError({ estado: false, msg: {} });
    setCargando(false);
    setConfigurarPassword(opcion == "crear" ? true : false);
    onHide();
  };

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reCorreo = new RegExp(
      "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
    );
    const reTexto = new RegExp("^([Na-zA-ZáéíóúÁÉÍÓÚñÑ ]+)$");
    const reNumeros = new RegExp("^([0-9]+)$");

    let errores = {};

    for (const [key, value] of Object.entries(datos)) {
      if (key !== "password" && key !== "repassword" && key !== "telefono") {
        if (value.trim().length == 0) {
          errores = { ...errores, [key]: `Debe introducir un ${key} valido.` };
        }
      } else {
        if (value.length < 8 && key !== "telefono" && configurarPassword) {
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

    if (datos.telefono.trim().length > 0) {
      if (!reNumeros.test(datos.telefono)) {
        errores = {
          ...errores,
          telefono: `Debe introducir un telefono valido.`,
        };
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
        if (key != "repassword" && key != "password" && key != "telefono") {
          formData.append(key, value);
        } else if (configurarPassword) {
          formData.append(key, value);
        }else if (key == "telefono") {
					if(datos.telefono != ""){
						formData.append(key, value);
					}
				}
      }
      const token = await JSON.parse(localStorage.getItem("token"));
      if (opcion == "crear") {
        axios
          .post(`${url}/usuarios`, formData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            Swal.fire({
              title: "Exito",
              icon: "success",
              text: "Cuenta creada exitosamente!",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#6c757d",
            });

            cargaUsuarios();
            setDatos(datosVacios);
            onHide();
          })
          .catch((err) => {
            err.response.data.errors.map((i) => {
              setError({
                estado: false,
                msg: { ...error.msg, [i.param]: i.msg },
              });
            });
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
      } else {
				const id = usuario._id;
        axios
          .put(`${url}/usuarios/${id}`, formData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            Swal.fire({
              title: "Exito",
              icon: "success",
              text: "Cuenta editada exitosamente!",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#6c757d",
            });

            cargaUsuarios();
            setDatos(datosVacios);
            onHide();
          })
          .catch((err) => {
            err.response.data.errors.map((i) => {
              setError({
                estado: false,
                msg: { ...error.msg, [i.param]: i.msg },
              });
            });
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
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={opcion == "crear" ? "bg-success": "bg-warning"} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {opcion == "crear" ? "Agregar Usuario" : "Editar Usuario"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <FloatingLabel controlId="correo" label="Correo:" className="mb-3">
            <Form.Control
              type="email"
              name="correo"
              placeholder="Correo"
              className="bg-success-subtle"
              value={datos.correo}
              onChange={handleChange}
              isInvalid={error.msg.correo ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.msg.correo}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel controlId="nombre" label="Nombre:" className="mb-3">
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="bg-success-subtle"
              value={datos.nombre}
              onChange={handleChange}
              isInvalid={error.msg.nombre ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.msg.nombre}
            </Form.Control.Feedback>
          </FloatingLabel>

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
              value={datos.apellido}
              onChange={handleChange}
              isInvalid={error.msg.apellido ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.msg.apellido}
            </Form.Control.Feedback>
          </FloatingLabel>

          <FloatingLabel
            controlId="telefono"
            label="(Opcional) Telefono:"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="telefono"
              placeholder="(Opcional) Telefono"
              className="bg-success-subtle"
              value={datos.telefono}
              onChange={handleChange}
              isInvalid={error.msg.telefono ? true : false}
            />
            <Form.Control.Feedback type="invalid">
              {error.msg.telefono}
            </Form.Control.Feedback>
          </FloatingLabel>

          {configurarPassword ? (
            <>
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
            </>
          ) : (
            <Button
              variant="info"
              className="d-block w-100 my-3"
              onClick={() => setConfigurarPassword(true)}
            >
              Editar Contraseña
            </Button>
          )}

          <div className="mt-3 text-end">
            <Button
              type="submit"
              variant="success"
              className="me-3"
              disabled={cargando}
            >
              {cargando ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                "Aceptar"
              )}
            </Button>
            <Button onClick={cerrarModal} variant="danger" disabled={cargando}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
