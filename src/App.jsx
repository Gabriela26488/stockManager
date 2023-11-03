import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lista from "./components/Lista/Lista"; // importamos el componente lista
import { Auth } from "./components/auth/Auth";
import { Usuarios } from "./components/Usuarios/Usuarios";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/productos" element={<Lista />} />
        <Route path="/favoritos" element={<h1>Favoritos</h1>} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/perfil" element={<h1>Perfil</h1>} />
        <Route path="/*" element={<h1>Ruta Invalida</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
