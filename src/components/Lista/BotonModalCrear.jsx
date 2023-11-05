import { useState } from "react";
import { Button } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { ModalCrear } from "./ModalCrear";

export const BotonModalCrear = ({cargarProductos}) => {
  const [modalCrear, setModalCrear] = useState(false);
  return (
    <>
      <Button
        variant="success"
        size="lg"
        className="position-fixed rounded-circle bottom-0 end-0 mb-5 me-5"
        style={{zIndex: 20}}
        onClick={() => setModalCrear(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <PlusLg className="mb-1"/>
      </Button>

      <ModalCrear show={modalCrear} cargarProductos={cargarProductos} onHide={() => setModalCrear(false)} />
    </>
  );
};
