import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { url } from "../../backend";
import { Producto } from "../producto/Producto";
import Header from "../header/header";

const Lista = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);

  function cargarProductos() {
    setCargando(true);
    axios
      .get(`${url}/productos`)
      .then((res) => setProductos(res.data))
      .catch((err) => console.error(err))
      .finally(() => setCargando(false));
  }

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
