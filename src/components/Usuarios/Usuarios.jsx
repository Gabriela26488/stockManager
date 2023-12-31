import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";
import { url } from "../../backend";
import { Container, Row, Spinner } from "react-bootstrap";
import { Usuario } from "./Usuario";
import { BotonCrearUsuario } from "./BotonCrearUsuario";
import { useNavigate } from "react-router-dom";

export const Usuarios = () => {
  const [listaUsuarios, setUsuarios] = useState([]);
  const [cargarndo, setCargando] = useState(false);
  const navigate = useNavigate();

  const cargaUsuarios = async () => {
    setCargando(true);
    const token = await JSON.parse(localStorage.getItem("token"));

    axios
      .get(`${url}/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        setUsuarios(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setCargando(false));
  };

  const validaRol = async () => {
    const usuario = await JSON.parse(localStorage.getItem("usuario"))
    if (usuario.rol != "admin") {
      navigate("/productos");
    }
  }

  useEffect(() => {
    validaRol();
    cargaUsuarios();
  }, []);

  return (
    <>
      <Header />

      <div className="mt-5 text-center text-success">
        <h1>Usuarios</h1>
      </div>
      <Container className="mt-4">
        <Row>
          {cargarndo ? (
            <div className="text-center w-100">
              <Spinner variant="success" size="lg" className="mt-5" />
            </div>
          ) : (
            listaUsuarios.map((usuario, i) => (
              <Usuario
                usuario={usuario}
                cargaUsuarios={cargaUsuarios}
                key={i}
              />
            ))
          )}
        </Row>

        <BotonCrearUsuario cargaUsuarios={cargaUsuarios} />
      </Container>
    </>
  );
};
