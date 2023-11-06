import { useEffect, useState } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Buscar } from "./Buscar";
import { Categorias } from "./Categorias";

export const Menu = ({
  show,
  handleClose,
  cargarProductos,
  buscarNombre,
  buscarCategoria,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState({});
  const cargarUsuario = async () => {
    setUsuario(JSON.parse(localStorage.getItem("usuario")));
  };

  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    navigate("/");
  };

  useEffect(() => {
    cargarUsuario();
  }, []);
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header className="bg-success text-white" closeButton>
          <Offcanvas.Title>stockManager</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Stack>
            <div className="p-2">
              <Link
                to="/productos"
                className="text-start text-decoration-none w-100 btn btn-light"
              >
                <span>Productos</span>
              </Link>
            </div>
            {location.pathname == "/productos" ? (
              <>
                <div className="p-2">
                  <Buscar buscarNombre={buscarNombre} />
                </div>
                <div className="p-2">
                  <Categorias
                    buscarCategoria={buscarCategoria}
                    cargarProductos={cargarProductos}
                  />
                </div>
              </>
            ) : (
              ""
            )}

            {usuario.rol == "admin" ? (
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

            <div className="p-2">
              <Button
                variant="light"
                className="text-start text-decoration-none w-100"
                onClick={handleClick}
              >
                <span>Salir</span>
              </Button>
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
