import {Modal} from "react-bootstrap";
import { EditarProducto } from "./EditarProducto";

export const ModalEditar = ({show, onHide, valores, cargarProductos}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-warning" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar Producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditarProducto cargarProductos={cargarProductos} onHide={onHide} valores={valores} />
      </Modal.Body>
    </Modal>
  );
};