import {Modal} from "react-bootstrap";
import { CrearProducto } from "../producto/CrearProducto";

export const ModalCrear = ({show, onHide, cargarProductos}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-success" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar Producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CrearProducto onHide={onHide} cargarProductos={cargarProductos} />
      </Modal.Body>
    </Modal>
  );
};
