import { useState } from "react";
import { Button } from "react-bootstrap";
import { BagPlus } from "react-bootstrap-icons";
import { ModalCrear } from "./ModalCrear";

export const BotonModalCrear = ({cargarProductos}) => {
  const [modalCrear, setModalCrear] = useState(false);
  const [hover, setHover] = useState(false)
  return (
    <>
      <Button
        variant={hover ? 'success' : 'light'}
        className="w-100"
        onClick={() => setModalCrear(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <BagPlus /> Agregar
      </Button>

      <ModalCrear show={modalCrear} cargarProductos={cargarProductos} onHide={() => setModalCrear(false)} />
    </>
  );
};
