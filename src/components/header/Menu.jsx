import { Offcanvas, Stack } from "react-bootstrap";
import { Buscar } from "./Buscar";
import { Categorias } from "./Categorias";
import { Link } from "react-router-dom";

export const Menu = ({ show, handleClose }) => {
  const rol = "admin";
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header className="bg-success text-white" closeButton>
          <Offcanvas.Title>stockManager</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack>
            <div className="p-2">
              <Buscar />
            </div>
            <div className="p-2">
              <Categorias />
            </div>

            {rol == "admin" ? (
              <div className="p-2">
                <Link
                  to="/usuarios"
                  className="text-start text-decoration-none w-100 btn btn-light"
                >
                  <span>Usuarios</span>
                </Link>
              </div>
            ) : (
              <>
                <div className="p-2">
                  <Link
                    to="/favoritos"
                    className="text-start text-decoration-none w-100 btn btn-light"
                  >
                    <span>Favoritos</span>
                  </Link>
                </div>
              </>
            )}

            <div className="p-2">
              <Link
                to="/perfil"
                className="text-start text-decoration-none w-100 btn btn-light"
              >
                <span>Mi cuenta</span>
              </Link>
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
