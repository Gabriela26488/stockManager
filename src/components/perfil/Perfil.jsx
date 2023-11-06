import Header from "../header/Header";
import { MostrarDatos } from "./MostrarDatos";

export const Perfil = () => {
  return (
    <>
      <Header />
      <div className="mt-5 text-center text-success">
        <h1>Mi cuenta</h1>
      </div>

      <MostrarDatos />
    </>
  );
};
