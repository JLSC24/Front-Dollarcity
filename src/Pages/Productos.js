import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Button, Modal, Card, Row, Col, Badge } from "react-bootstrap";

import ImageContainer from "../components/ImageContainer.js";

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "bootstrap/dist/css/bootstrap.css";

export default function Products() {
  const [dataProducts, setDataProducts] = React.useState();
  const [show, setShow] = React.useState(false);
  const [productsShoppingCar, setProductsShoppingCar] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToShoppingCar = () => {
    console.log("Añadir al carrito");
  };
  const onIsVisible = (index) => {
    if (index === images.length - 1) {
      setPage((page) => page + 1);
    }
  };
  return (
    <div id="layoutDefault">
      <div id="layoutDefault_content">
        <main>
          {/* Modal de carrito de compras */}
          <Modal show={show} onHide={handleClose} size="lg" border="success">
            <Modal.Header closeButton>
              <Modal.Title>Carrito de compra</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card>
                <Row className="align-items-center">
                  <Col sm={3} xs={3}>
                    <Card
                      className="bg-dark text-white"
                      style={{ margin: "5%" }}
                    >
                      {/* <Card.Img
                        src="https://source.unsplash.com/tG36rvCeqng/800x500"
                        alt="Card image"
                      /> */}
                    </Card>
                  </Col>
                  <Col sm={2} xs={3}>
                    <h6>Gray Bicycle</h6>
                  </Col>
                  <Col sm={2} xs={3} className="text-right">
                    <label>Cantidad:</label>
                  </Col>
                  <Col sm={1} xs={3}>
                    <input
                      type="number"
                      className="text-center"
                      defaultValue={1}
                      style={{ maxWidth: "50px" }}
                    />
                  </Col>
                  <Col sm={2} xs={3}>
                    <Button variant="danger">Quitar</Button>
                  </Col>
                  <Col sm={2} xs={3}>
                    <h4>$000.00</h4>
                  </Col>
                </Row>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Seguir comprando
              </Button>
              <Button className="botonPositivo" onClick={handleClose}>
                Ir a pagar
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Page Header*/}
          <header className="page-header page-header-ligth bg-img-repeat colorHeader">
            <div className="page-header-content">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-8 col-lg-10 text-center">
                    <h1 className="page-header-title">Nuestros productos</h1>
                    <p className="page-header-text mb-5">
                      Acá puedes encontrar algunos de nuestros productos
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="svg-border-waves text-light">
              {/* Wave SVG Border*/}
              <svg
                className="wave"
                style={{ pointerEvents: "none" }}
                fill="currentColor"
                preserveAspectRatio="none"
                viewBox="0 0 1920 75"
              >
                <defs>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        "\n                                        .a {\n                                            fill: none;\n                                        }\n                                        .b {\n                                            clip-path: url(#a);\n                                        }\n                                        .d {\n                                            opacity: 0.5;\n                                            isolation: isolate;\n                                        }\n                                    ",
                    }}
                  />
                </defs>
                <clipPath id="a">
                  <rect className="a" width={1920} height={75} />
                </clipPath>
                <g className="b">
                  <path
                    className="c"
                    d="M1963,327H-105V65A2647.49,2647.49,0,0,1,431,19c217.7,3.5,239.6,30.8,470,36,297.3,6.7,367.5-36.2,642-28a2511.41,2511.41,0,0,1,420,48"
                  />
                </g>
                <g className="b">
                  <path
                    className="d"
                    d="M-127,404H1963V44c-140.1-28-343.3-46.7-566,22-75.5,23.3-118.5,45.9-162,64-48.6,20.2-404.7,128-784,0C355.2,97.7,341.6,78.3,235,50,86.6,10.6-41.8,6.9-127,10"
                  />
                </g>
                <g className="b">
                  <path
                    className="d"
                    d="M1979,462-155,446V106C251.8,20.2,576.6,15.9,805,30c167.4,10.3,322.3,32.9,680,56,207,13.4,378,20.3,494,24"
                  />
                </g>
                <g className="b">
                  <path
                    className="d"
                    d="M1998,484H-243V100c445.8,26.8,794.2-4.1,1035-39,141-20.4,231.1-40.1,378-45,349.6-11.6,636.7,73.8,828,150"
                  />
                </g>
              </svg>
            </div>
          </header>
          <section className="bg-light py-10">
            <div className="container">
              <h2 className="mb-4">Artículos</h2>
              <Button className="botonPositivo addToCart" onClick={handleShow}>
                <ShoppingCartIcon fontSize="large" />
                <Badge bg="danger" className="notificationCart">
                  1
                </Badge>
              </Button>

              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-6 mb-5">
                  <Card className="card lift h-100">
                    <div
                      className="card-flag card-flag-dark card-flag-top-right card-flag-lg"
                      style={{ backgroundColor: "#757575" }}
                    >
                      $115
                    </div>
                    <Link to="/">
                      <div>
                        {/* <ImageContainer
                          src="https://source.unsplash.com/tG36rvCeqng/400x250"
                          alt="imagen de prueba"
                          onIsVisible={() => onIsVisible(1)}
                        /> */}
                      </div>
                      {/* <img
                        className="card-img-top"
                        src="https://source.unsplash.com/tG36rvCeqng/800x500"
                        alt="..."
                      /> */}
                    </Link>

                    <div className="card-body p-3">
                      <div className="card-title small mb-0">Gray Bicycle</div>
                      <div className="text-xs text-gray-500 mb-1">
                        Readcaster, CO · 2 days ago
                      </div>

                      <Button
                        className="botonPositivo"
                        onClick={() => addToShoppingCar()}
                      >
                        <AddShoppingCartIcon fontSize="medium" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>
          <hr className="my-0" />
        </main>
      </div>
    </div>
  );
}
