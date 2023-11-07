import axios from "axios";
import { url } from "../../backend";
import Header from "../header/Header";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Favorito } from "./Favorito";
import { useNavigate } from "react-router-dom";

export const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [cargarndo, setCargando] = useState(false);
  const navigate = useNavigate();
  const cargaFavoritos = async () => {
    setCargando(true);
    const token = await JSON.parse(localStorage.getItem("token"));
    axios
      .get(`${url}/productos/favoritos/lista`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        setFavoritos(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setCargando(false));
  };

  const validaRol = async () => {
    const usuario = await JSON.parse(localStorage.getItem("usuario"))
    if (usuario.rol == "admin") {
      navigate("/productos");
    }
  }

  useEffect(() => {
    validaRol();
    cargaFavoritos();
  }, []);
  return (
    <>
      <Header />

      <div className="mt-5 text-center text-success">
        <h1>Favoritos</h1>
      </div>

      <Container className="mt-5">
        <Row>
          {cargarndo ? (
            <div className="text-center w-100">
              <Spinner variant="success" size="lg" className="mt-5" />
            </div>
          ) : (
            <>
              {favoritos.length < 1 ? (
                <div className="text-center mt-5">
                  <h1>No se encontraron Favoritos.</h1>
                </div>
              ) : (
                favoritos.map((favorito, i) => {
                  if (favorito.cantidad < 1) return;
                  return (
                    <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-3">
                      <Favorito favorito={favorito} />
                    </Col>
                  );
                })
              )}
            </>
          )}
        </Row>
      </Container>
    </>
  );
};
