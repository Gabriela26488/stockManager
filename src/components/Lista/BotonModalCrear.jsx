import { useState } from "react";
import { Button } from "react-bootstrap";
import { BagPlus } from "react-bootstrap-icons";
import { ModalCrear } from "./ModalCrear";

export const BotonModalCrear = () => {
  const [modalCrear, setModalCrear] = useState(false);
  return (
    <>
      <Button
        variant="success"
        className="w-100"
        onClick={() => setModalCrear(true)}
      >
        <BagPlus /> Agregar
      </Button>

      <ModalCrear show={modalCrear} onHide={() => setModalCrear(false)} />
    </>
  );
};
