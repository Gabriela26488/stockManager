import { useState } from "react";
import { Button, Row, Col, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';
import { url } from "../../backend";
import { Formulario } from "../Utilidades/Formulario";

export const CrearProducto = ({ onHide, cargarProductos }) => {
  
  /* 
    "valoresDefecto" establece los valores iniciales al
    estado "datos"
  */
  const valoresDefecto = {
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
    categoria: "",
    imagen: "",
  };

  /* 
    el estado "datos" se utilizara para almacenar los datos
    del formulario para registrar un producto
  */
  const [datos, setDatos] = useState(valoresDefecto);

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
    un nuevo producto. El parametro "e" tiene como valor las propiedades
    del elemento de DOM que llama funcion
  */
  async function handleSubmit(e) {
    e.preventDefault();
		
    setCargando(true);

    const formData = new FormData();
		const errores = [];
    for (const [key, value] of Object.entries(datos)) {
      if (key !== "imagen") {
        if (value.trim().length == 0) {
          errores.push({ msg: `El campo ${key.toUpperCase()} esta Vacío` });
        }
				else {
					formData.append(key, value);
				}
      } else {
        if (value == "") {
          errores.push({ msg: `El campo ${key.toUpperCase()} esta Vacío` });
        }
				else {
					formData.append(key, value);
				}
      }
    }

		if (errores.length > 0) {
			setError({estado:true, msg: errores});
			Swal.fire({
				title: 'Error!',
				icon: 'error',
				confirmButtonText: 'Continuar',
				confirmButtonColor: '#6c757d'
			})
			setCargando(false);
			return
		}

    await axios
      .post(`${url}/productos`, formData)
      .then((res) => {
      /* 
        la funcion "Swal.fire" viene de la libreria "sweetalert2"
        y nos sirve para manejar los mensajes de confirmacion
        y mostrarlos de una mejor forma en la interfaz
      */
				Swal.fire({
					title: 'Hecho!',
					icon: 'success',
					text: 'El producto se ha guardado',
					confirmButtonText: 'Continuar',
					confirmButtonColor: '#6c757d'
				})
				onHide();
			})				
      .catch((err) => {
        setError({ estado: true, msg: err.response.data.errors });
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					confirmButtonText: 'Continuar',
					confirmButtonColor: '#6c757d'
				})
      })
      .finally(() => {
				setDatos(valoresDefecto);
				setCargando(false);
        cargarProductos();
			});
  }
  return (
    <div>
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
      {
				cargando 
				? (<Spinner animation="border" variant="primary" />) 
				: (
						<Form onSubmit={handleSubmit}>
							<Formulario datos={datos} handleChange={handleChange} />
							<Row xs="auto">
								<Col className="ms-auto">
									<Button type="submit" variant="success" className="me-3">
										Agregar
									</Button>
									<Button onClick={onHide} variant="danger">
										Cancelar
									</Button>
								</Col>
							</Row>
						</Form>
					)
				}
    </div>
  );
};
