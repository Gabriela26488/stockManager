import { Card } from "react-bootstrap";
import logo from "../../assets/StocKManager.png";
import { FormLogin } from "./FormLogin";
import { useState } from "react";
import { FormRegistro } from "./FormRegistro";

export const Auth = () => {
  const [registro, setRegistro] = useState(false);

  

  return (
    <div className="col-10 col-md-6 col-lg-5 position-absolute top-50 start-50 translate-middle">
      <Card className="bg-white w-100 border border-3 border-black rounded">
        <div className="bg-success text-center">
          <Card.Img variant="top" className="w-50 mx-auto" src={logo} />
        </div>
        <Card.Body>
          {!registro ? (
            <FormLogin />
          ) : (
            <FormRegistro setRegistro={setRegistro} />
          )}
        </Card.Body>
        <Card.Footer>
          {!registro ? (
            <span>
              No tienes cuenta?
              <a href="#" onClick={() => setRegistro(!registro)}>
                registrate aquí!
              </a>
            </span>
          ) : (
            <span>
              Tienes cuenta?{" "}
              <a href="#" onClick={() => setRegistro(!registro)}>
                inicia sesión aquí!
              </a>
            </span>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};
