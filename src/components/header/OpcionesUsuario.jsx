import { Button } from "react-bootstrap";
import { PersonFill, StarFill } from "react-bootstrap-icons";

export const OpcionesUsuario = () => {
  return (
    <>
      <Button variant="light" className="rounded rounded-circle">
        <StarFill className="pt-1 h4" />
      </Button>
      <Button variant="light" className="rounded rounded-circle ms-2">
        <PersonFill className="pt-1 h4" />
      </Button>
    </>
  );
};
