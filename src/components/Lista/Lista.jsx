import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../../backend";
import { Producto } from "../producto/Producto";
import Header from "../header/Header";

const Lista = () => {
  /* 
    el estado "productos es donde se almacenara la lista de los
    productos registrados, por defecto se inicia con un 
    arreglo vacio"
  */
  const [productos, setProductos] = useState([]);

  /* 
    el estado "cargando" nos sirve para mostrar un 
    preloader al momento de uqe se este esperando la respuesta a una peticion 
  */
  const [cargando, setCargando] = useState(false);

  
  /* 
    la funcion "cargarProductos" es la que se encarga de hacer la consulta
    al backend para luego almacenar los datos en el estado de "productos"
  */
  function cargarProductos() {
    setCargando(true);
    axios
      .get(`${url}/productos`)
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err))
      .finally(() => setCargando(false));
  }

  /* 
    la funcion "eliminar" es la que se encarga de hacer la consulta
    al backend para eliminar un producto y tiene como parametro "id" que
    su valor sera el id de un producto. Se utiliza la funcion "Swal.fire"
    para manejar la confirmacion y mostrarla en la interfaz
  */
  function eliminar(id) {
    Swal.fire({
      title: "Estas seguro de eliminar este producto?",
      text: "No podras revertir estos cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}/productos/${id}`)
          .then((res) => cargarProductos())
          .catch((err) => console.error(err))
          .finally(() =>
            Swal.fire({
              title: "Eliminado!",
              icon: "success",
              text: "El producto ha sido removido.",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#28a745",
            })
          );
      }
    });
  }

  /* 
    la funcion "buscarNombre" es la que se encarga de hacer la consulta
    al backend para buscar un producto por su nombre y tiene como parametro "nombre" que
    su valor sera un string con el nombre de un producto.
  */
  function buscarNombre(nombre) {
    if (nombre.trim().length == 0) {
      cargarProductos();
      return;
    }
    setCargando(true);
    axios
      .get(`${url}/productos/buscar/${nombre}`)
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err))
      .finally(() => setCargando(false));
  }

  /* 
    la funcion "buscarCategoria" es la que se encarga de hacer la consulta
    al backend para filtrar los productos por categoria y tiene como parametro "categoria" que
    su valor sera un string con la categoria a buscar.
  */
  function buscarCategoria(categoria) {
    if (categoria.trim().length == 0) {
      cargarProductos();
      return;
    }
    setCargando(true);
    axios
      .get(`${url}/productos/categoria/${categoria}`)
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err))
      .finally(() => setCargando(false));
  }

  /* 
    la funcion de react useEffect ejecutara la funcion "cargarProductos"
    al cargar el componente
  */
  useEffect(() => {
    cargarProductos();
  }, []);
  return (
    <div>
      <Header
        cargarProductos={cargarProductos}
        buscarNombre={buscarNombre}
        buscarCategoria={buscarCategoria}
      />
      <Container className="mt-5 pt-3">
        {cargando ? (
          <div className="text-center">
            <Spinner animation="border" variant="secondary" />
          </div>
        ) : (
          <>
            {productos.length < 1 ? (
              <div className="text-center mt-5">
                <h1>No se encontraron productos.</h1>
              </div>
            ) : (
              <Row>
                {productos.map((producto, i) => (
                  <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-3">
                    <Producto
                      valores={producto}
                      cargarProductos={cargarProductos}
                      eliminar={eliminar}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Lista;
