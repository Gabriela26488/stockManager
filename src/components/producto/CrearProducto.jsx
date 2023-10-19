import { useState } from "react";
import { Formulario } from "../Utilidades/Formulario";
import { Button, Row, Col, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';
import { url } from "../../backend";

export const CrearProducto = ({ onHide, cargarProductos }) => {
  const valoresDefecto = {
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
    categoria: "",
    imagen: "",
  };
  const [datos, setDatos] = useState(valoresDefecto);

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
