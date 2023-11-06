import { Card, Col, Row, Tab, Tabs } from "react-bootstrap";
import { url } from "../../backend";
import { BoxSeamFill, CardList, InfoCircle } from "react-bootstrap-icons";

export const Favorito = ({favorito}) => {
  return (
    <Card border="success" className="position-relative">
        <Card.Img
          variant="top"
          src={url.slice(0, url.length - 3) + favorito.imagen}
        />
        <Card.Header>
          <h5>{favorito.nombre}</h5>
        </Card.Header>
        <Card.Body>
          <Tabs
            defaultActiveKey="datos"
            className="mb-3 justify-content-between"
          >
            <Tab eventKey="datos" title={<CardList />}>
              <div>
                <h6 className="font-monospace text-capitalize text-center">
                  {favorito.categoria}
                </h6>
              </div>
              <div>
                <Row>
                  <Col>
                    <h4>
                      <strong>${favorito.precio}</strong>
                    </h4>
                  </Col>
                  <Col>
                    <h5>
                      <BoxSeamFill /> {favorito.cantidad}
                    </h5>
                  </Col>
                </Row>
              </div>
            </Tab>
            <Tab eventKey="informacion" title={<InfoCircle />}>
              {favorito.descripcion}
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
  )
}
