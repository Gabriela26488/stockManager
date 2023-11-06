import axios from "axios";
import Swal from "sweetalert2";
import { url } from "../../backend";
import { Button, Card, Col, Row } from "react-bootstrap";
import { BotonEditar } from "./BotonEditar";

export const Usuario = ({ usuario, cargaUsuarios }) => {
  const eliminar = (id) => {
    Swal.fire({
      title: "Estas seguro de eliminar este Usuario?",
      text: "No podras revertir estos cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = await JSON.parse(localStorage.getItem("token"));
        axios
          .delete(`${url}/usuarios/${id}`, {
            headers: { Authorization: "Bearer " + token },
          })
          .then(() => cargaUsuarios())
          .catch((err) => console.error(err.response))
          .finally(() =>
            Swal.fire({
              title: "Eliminado!",
              icon: "success",
              text: "El usuario ha sido removido.",
              confirmButtonText: "Continuar",
              confirmButtonColor: "#28a745",
            })
          );
      }
    });
  };

  return (
    <Col xs={12} sm={6} lg={4} l className="mb-3">
      <Card className="w-100 h-100 bg-light d-flex flex-column p-3 border border-2 border-success">
        <Card.Text>
          <strong>Correo: </strong>
          <br />
          {usuario.correo}
        </Card.Text>
        <Card.Text>
          <strong>Nombre: </strong>
          <br />
          {usuario.nombre}
        </Card.Text>
        <Card.Text>
          <strong>Apellido: </strong>
          <br />
          {usuario.apellido}
        </Card.Text>
        <Card.Text>
          <strong>Telefono: </strong>
          <br />
          {usuario.telefono ? usuario.telefono : "--"}
        </Card.Text>
        <Row>
          <Col>
            <BotonEditar cargaUsuarios={cargaUsuarios} usuario={usuario} />
          </Col>
          <Col>
            <Button
              variant="danger"
              className="text-black w-100"
              onClick={() => eliminar(usuario._id)}
            >
              Eliminar
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
