import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Lista from "./components/Lista/Lista"; // importamos el componente lista
import { url } from "./backend";
import { Auth } from "./components/auth/Auth";
import { Usuarios } from "./components/Usuarios/Usuarios";
import { Perfil } from "./components/perfil/Perfil";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const verificarLogin = () => {
    new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem("token")));
    }).then(async (token) => {
      if (token) {
        axios
          .get(`${url}/usuarios/verificar/usuario`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            localStorage.setItem("usuario", JSON.stringify(res.data));
            if (location.pathname == "/") {
              navigate("/productos");
            }
          })
          .catch((err) => {
            console.log(err);
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
            navigate("/");
          });
      } else {
        navigate("/");
      }
    });
  };
  useEffect(() => {
    verificarLogin();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/productos" element={<Lista />} />
      <Route path="/favoritos" element={<h1>Favoritos</h1>} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/*" element={<h1>Ruta Invalida</h1>} />
    </Routes>
  );
}

export default App;
