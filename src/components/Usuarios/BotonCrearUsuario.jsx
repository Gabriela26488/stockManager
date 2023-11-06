import { useState } from "react";
import { Button } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { CrearUsuario } from "./CrearUsuario";

export const BotonCrearUsuario = ({cargaUsuarios}) => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button
        variant="success"
        size="lg"
        className="position-fixed rounded-circle bottom-0 end-0 mb-5 me-5"
        style={{zIndex: 20}}
        onClick={() => setModal(true)}
      >
        <PlusLg className="mb-1"/>
      </Button>

      <CrearUsuario show={modal} cargaUsuarios={cargaUsuarios} onHide={() => setModal(false)} />
    </>
  );
};
