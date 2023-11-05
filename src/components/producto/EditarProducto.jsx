import { useState } from "react";
import { Alert, Spinner, Form, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { url } from "../../backend";
import { Formulario } from "../Utilidades/Formulario";

export const EditarProducto = ({ onHide, valores, cargarProductos }) => {
  /* 
    el estado "datos" se utilizara para almacenar los datos
    del formulario para editar un producto, sus valores iniciales
    vendrarn del prop "valores".
  */
  const [datos, setDatos] = useState({
    _id: valores._id,
    nombre: valores.nombre,
    descripcion: valores.descripcion,
    precio: valores.precio,
    cantidad: valores.cantidad,
    categoria: valores.categoria,
    imagen: "",
  });

  /* 
    el estado "error" nos sirve para manejar los errores
    que se presenten al momento de un registro y el valor
    de "error.msg" se mostrara en la interfaz
  */
  const [error, setError] = useState({
    estado: false,
    msg: null,
  });

  /* 
    el estado "cargando" nos sirve para mostrar un 
    preloader al momento de uqe se este esperando la respuesta a una peticion 
  */
  const [cargando, setCargando] = useState(false);

  /* 
    la funcion "handleChange" se encarga de hacer el proceso de
    cambiar los valores en el estado "datos" a traves de la funcion
    "setDatos". El parametro "e" tiene como valor las propiedades
    del elemento de DOM que llama funcion
  */
  function handleChange(e) {
    if (e.target.name === "imagen") {
      setDatos({ ...datos, [e.target.name]: e.target.files[0] });
    } else {
      setDatos({ ...datos, [e.target.name]: e.target.value });
    }
  }

  /* 
    la funcion "handleSubmit" se encarga de hacer el proceso de
    validar los datos y hacer la peticion al backend para guardar
    los datos editados de un producto. El parametro "e" tiene como valor las propiedades
    del elemento de DOM que llama funcion
  */
  async function handleSubmit(e) {
    e.preventDefault();
    const token = await JSON.parse(localStorage.getItem("token"));
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
          /* 
            la funcion "Swal.fire" viene de la libreria "sweetalert2"
            y nos sirve para manejar los mensajes de confirmacion
            y mostrarlos de una mejor forma en la interfaz
          */
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
            headers: { "Content-Type": "application/json",  Authorization: "Bearer " + token },
          })
          .then(async () => {
            if (datos.imagen !== "") {
              const imagen = new FormData();
              imagen.append("imagen", datos.imagen);

              await axios.put(`${url}/productos/imagen/${valores._id}`, imagen, {
                headers: { Authorization: "Bearer " + token },
              });
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
