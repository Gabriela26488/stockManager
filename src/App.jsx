import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Lista from "./components/Lista/Lista"; // importamos el componente lista
import { url } from "./backend";
import { Auth } from "./components/auth/Auth";
import { Usuarios } from "./components/Usuarios/Usuarios";
import { Perfil } from "./components/perfil/Perfil";
import { Favoritos } from "./components/favoritos/Favoritos";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  /* 
    la funcion verificar login revisa si hay un token en localStorage,
    de haber token se hace una consulta al bockend para comprobar si es valido.
    Si el token es valido se guardan los datos del usuario logueado en el localStorage.
    Si no hay token o este no es valido se redireccionara al usuario al Login

  */
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
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/*" element={<h1>Ruta Invalida</h1>} />
    </Routes>
  );
}

export default App;
