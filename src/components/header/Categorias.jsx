import { Form } from "react-bootstrap";

export const Categorias = () => {
  const categorias = [
    "carniceria",
    "pescaderia",
    "charcuteria",
    "frutas",
    "verduras",
    "bebidas",
    "golosinas",
    "enlatados",
    "viveres",
    "postres",
  ];

  return (
    <Form.Select>
      <option key="default" value="">
        Categorias
      </option>
      {categorias.map((categoria, i) => (
        <option key={i} value={categoria} className="text-capitalize">
          {categoria}
        </option>
      ))}
    </Form.Select>
  );
};
