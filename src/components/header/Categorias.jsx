import { Form } from "react-bootstrap";

export const Categorias = ({buscarCategoria}) => {
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

  function handleCategoria(categoria) {
    buscarCategoria(categoria);
  }

  return (
    <Form.Select onChange={(e) => handleCategoria(e.target.value)}>
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
