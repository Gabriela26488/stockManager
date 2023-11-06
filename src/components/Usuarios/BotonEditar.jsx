import { useState } from "react";
import { Button } from "react-bootstrap";
import { CrearUsuario } from "./CrearUsuario";

export const BotonEditar = ({cargaUsuarios, usuario}) => {
  const [modal, setModal] = useState(false);
  return (
		<>
      <Button
        variant="warning" 
				className="w-100"
        onClick={() => setModal(true)}
      >
        Editar
      </Button>

      <CrearUsuario show={modal} cargaUsuarios={cargaUsuarios} onHide={() => setModal(false)} usuario={usuario} />
    </>
	);
};
