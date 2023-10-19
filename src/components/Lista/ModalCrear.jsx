import {Modal, Button} from "react-bootstrap";
import { CrearProducto } from "../producto/CrearProducto";

export const ModalCrear = (props) => {
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="bg-success" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar Producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CrearProducto onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};
