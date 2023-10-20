import { Button, Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import { url } from "../../backend";
import { useState } from "react";
import {
  BoxSeamFill,
  CardList,
  InfoCircle,
  Pencil,
  Trash,
} from "react-bootstrap-icons";
import { ModalEditar } from "./ModalEditar";

/* 
  El componente Producto es donde se agregan los datos de
  un producto para mostrarlo en la interfaz
*/

export const Producto = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Card border="dark" className="position-relative">
        <div className="position-absolute top-0 end-0 mt-1 me-1">
          <Button
            variant="warning"
            className="rounded-circle btn-sm"
            onClick={() => setModalShow(true)}
          >
            <Pencil />
          </Button>
          <Button
            variant="danger"
            className="rounded-circle btn-sm"
            onClick={() => props.eliminar(props.valores._id)}
          >
            <Trash />
          </Button>
        </div>
        <Card.Img
          variant="top"
          src={url.slice(0, url.length - 3) + props.valores.imagen}
        />
        <Card.Header>
          <h5>{props.valores.nombre}</h5>
        </Card.Header>
        <Card.Body>
          <Tabs
            defaultActiveKey="datos"
            className="mb-3 justify-content-between"
          >
            <Tab eventKey="datos" title={<CardList />}>
              <div>
                <h6 className="font-monospace text-capitalize text-center">
                  {props.valores.categoria}
                </h6>
              </div>
              <div>
                <Row>
                  <Col>
                    <h4>
                      <strong>${props.valores.precio}</strong>
                    </h4>
                  </Col>
                  <Col>
                    <h5>
                      <BoxSeamFill /> {props.valores.cantidad}
                    </h5>
                  </Col>
                </Row>
              </div>
            </Tab>
            <Tab eventKey="informacion" title={<InfoCircle />}>
              {props.valores.descripcion}
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <ModalEditar show={modalShow} onHide={() => setModalShow(false)} cargarProductos={props.cargarProductos} valores={props.valores} />
    </>
  );
};
