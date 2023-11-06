import axios from "axios";
import { useEffect, useState } from "react";
import {
  Col,
  Container,
  FloatingLabel,
  Row,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { url } from "../../backend";

export const MostrarDatos = () => {
  const [usuario, setUsuario] = useState({});
  const [datos, setDatos] = useState({});
  const [editar, setEditar] = useState(false);
  const [error, setError] = useState({ estado: false, msg: {} });
  const [cargando, setCargando] = useState(false);
  const [configurarPassword, setConfigurarPassword] = useState(false);

  const cargarDatos = async () => {
    const usuarioLocal = await JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioLocal);
    setDatos({
      correo: usuarioLocal.correo,
      nombre: usuarioLocal.nombre,
      apellido: usuarioLocal.apellido,
      telefono: usuarioLocal.telefono ? usuarioLocal.telefono : "",
    });
  };

  const cancelarEditar = async () => {
    setEditar(false);
    setConfigurarPassword(false);
    setError({ estado: false, msg: {} });
    setDatos({
      correo: usuario.correo,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      telefono: usuario.telefono ? usuario.telefono : "",
    });
  };

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

		setCargando(true);

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
        } else if (key == "telefono") {
          if (datos.telefono != "") {
            formData.append(key, value);
          }
        }
      }

      const token = await JSON.parse(localStorage.getItem("token"));
      const id = usuario._id;
      console.log(id);

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

          localStorage.setItem("usuario", JSON.stringify(res.data.actualizado));
          setEditar(false);
          setConfigurarPassword(false);
          setError({ estado: false, msg: {} });
          cargarDatos();
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
  };

  useEffect(() => {
    cargarDatos();
  }, []);
  return (
    <>
      <Container className="mt-4 px-5">
        <Row>
          <Col xs={12} md={6}>
            <div className="bg-light py-3 px-2 border border-2 border-success rounded">
              <Form noValidate onSubmit={handleSubmit}>
                <FloatingLabel
                  controlId="correo"
                  label="Correo:"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    name="correo"
                    placeholder="Correo"
                    className="bg-success-subtle"
                    value={datos.correo || ""}
                    onChange={handleChange}
                    disabled={!editar}
                    isInvalid={error.msg.correo ? true : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.msg.correo}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                  controlId="nombre"
                  label="Nombre:"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    className="bg-success-subtle"
                    value={datos.nombre || ""}
                    onChange={handleChange}
                    disabled={!editar}
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
                    value={datos.apellido || ""}
                    onChange={handleChange}
                    disabled={!editar}
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
                    value={datos.telefono || ""}
                    onChange={handleChange}
                    disabled={!editar}
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
                  ""
                )}

                {editar ? (
                  <Button
                    type="submit"
                    variant="success"
                    className="me-3 w-100"
                    disabled={cargando}
                  >
                    {cargando ? (
                      <Spinner animation="border" variant="light" size="sm" />
                    ) : (
                      "Aceptar"
                    )}
                  </Button>
                ) : (
                  ""
                )}
              </Form>
            </div>
          </Col>
          <Col xs={12} md={6}>
            {!cargando ? (
              <div className="my-3 px-5">
                {!editar ? (
                  <Button
                    variant="info"
                    size="lg"
                    className="w-100"
                    onClick={() => setEditar(!editar)}
                  >
                    Editar mis datos
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    size="lg"
                    className="w-100"
                    onClick={cancelarEditar}
                  >
                    Cancelar
                  </Button>
                )}

                {editar && !configurarPassword ? (
                  <Button
                    variant="info"
                    size="lg"
                    className="w-100 mt-3"
                    onClick={() => setConfigurarPassword(true)}
                  >
                    Cambiar Contraseña
                  </Button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <div className="w-100 text-center">
								<Spinner animation="border" variant="light" size="lg" />
							</div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};
