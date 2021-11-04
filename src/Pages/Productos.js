import React, { lazy, useEffect } from "react";

import { Button, Modal, Card, Row, Col, Badge } from "react-bootstrap";

/* import ImageContainer from "../components/ImageContainer.js"; */

import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "bootstrap/dist/css/bootstrap.css";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);
const ImageContainer = lazy(() => import("../components/ImageContainer.js"));

export default function Products() {
  const [dataProducts, setDataProducts] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [productsShoppingCar, setProductsShoppingCar] = React.useState([]);
  const [dataRecomendada, setDataRecomendada] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [user, setUser] = React.useState(1);

  useEffect(() => {
    const fetchdata = async () => {
      let user = await Auth.currentAuthenticatedUser();
      setUser(user);
      const result = await fetch(
        "https://uz0m3atqdi.execute-api.us-east-2.amazonaws.com/dollarcity-api/products",
        {
          method: "GET",
          headers: { Accept: "application/json" },
        }
      );
      let data = await result.json();
      setDataProducts(data.body);
    };

    fetchdata();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToShoppingCar = async (data) => {
    //const result = await fetch("http://127.0.0.1:8000/model", {
    //  method: "POST",
    //  body: JSON.stringify(data),
    //  headers: { Accept: "application/json" },
    //});
    //let dataPredict = await result.json();
    //setDataRecomendada(dataPredict);
    console.log(data);
    let temp = productsShoppingCar;
    temp.push(data);
    setProductsShoppingCar(temp);
  };
  const onIsVisible = (index) => {
    if (index === images.length - 1) {
      setPage((page) => page + 1);
    }
  };

  const irAPagar = async () => {
    console.log(productsShoppingCar);
    let temp = [];
    if (productsShoppingCar !== null) {
      productsShoppingCar.map((data, index) => {
        let cantidad = document.getElementById("cantidad" + index).value;
        if (cantidad !== null && cantidad !== undefined) {
          for (let index = 0; index < cantidad; index++) {
            temp.push(data.producto.fields.precio);
          }
        }
        return null;
      });
    }
    let data = {
      iduser: user.attributes.email,
      costos: temp,
    };

    console.log(data);

    fetch(
      "https://uz0m3atqdi.execute-api.us-east-2.amazonaws.com/dollarcity-api/orders",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }
    )
      .then((data) =>
        data.json().then((response) => {
          if (data.status >= 200 && data.status < 300) {
            console.log(response);
            window.alert(
              "BUENARDA! acabas de comprar: $" +
                response.body.total +
                "\n" +
                " Su id de orden es: " +
                response.body.id_orden +
                "\n" +
                "HAS APORTADO UN GRANITO MÁS AL CAPITALISMO."
            );
          } else if (data.status >= 500) {
          } else if (data.status >= 400 && data.status < 500) {
          }
        })
      )
      .catch(function (err) {});
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
                  {productsShoppingCar !== null
                    ? productsShoppingCar.map((data, index) => {
                        return (
                          <>
                            <Col sm={3} xs={3}>
                              <Card
                                className="bg-dark text-white"
                                style={{ margin: "5%" }}
                              >
                                <div>
                                  <ImageContainer
                                    src={
                                      data.producto.fields.foto.fields.file.url
                                    }
                                    alt={
                                      data.producto.fields.foto.fields
                                        .description
                                    }
                                    url="/img"
                                    height={
                                      data.producto.fields.foto.fields.file
                                        .details.image.height
                                    }
                                    width={
                                      data.producto.fields.foto.fields.file
                                        .details.image.width
                                    }
                                    onIsVisible={() => onIsVisible(1)}
                                  />
                                </div>
                              </Card>
                            </Col>
                            <Col sm={2} xs={3}>
                              <h6>{data.producto.fields.nombre}</h6>
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
                                id={"cantidad" + index}
                              />
                            </Col>
                            <Col sm={2} xs={3}>
                              <Button variant="danger">Quitar</Button>
                            </Col>
                            <Col sm={2} xs={3}>
                              <h4>${data.precio}</h4>
                            </Col>
                          </>
                        );
                      })
                    : null}
                </Row>
              </Card>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Seguir comprando
              </Button>
              <Button className="botonPositivo" onClick={() => irAPagar()}>
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
                {productsShoppingCar !== null &&
                productsShoppingCar.length !== 0 ? (
                  <Badge bg="danger" className="notificationCart">
                    {productsShoppingCar.length}
                  </Badge>
                ) : null}
              </Button>
              {/* Render de la lista de los productos */}
              <div className="row">
                {dataProducts !== null
                  ? dataProducts.map((dat) => {
                      return (
                        <>
                          <div className="col-xl-3 col-lg-4 col-md-6 mb-5 text-center">
                            <Card className="card lift h-100">
                              <div
                                className="card-flag card-flag-dark card-flag-top-right card-flag-lg"
                                style={{
                                  backgroundColor: "#000",
                                  zIndex: 1,
                                }}
                              >
                                ${dat.precio}
                              </div>

                              <div>
                                <ImageContainer
                                  src={dat.producto.fields.foto.fields.file.url}
                                  alt={
                                    dat.producto.fields.foto.fields.description
                                  }
                                  url="/img"
                                  height={
                                    dat.producto.fields.foto.fields.file.details
                                      .image.height
                                  }
                                  width={
                                    dat.producto.fields.foto.fields.file.details
                                      .image.width
                                  }
                                  onIsVisible={() => onIsVisible(1)}
                                />
                              </div>

                              <div className="card-body p-3 align-items-bottom">
                                <div className="card-title small mb-0">
                                  {dat.producto.fields.nombre}
                                </div>
                                <div className="text-xs text-gray-500 mb-1">
                                  {dat.producto.fields.descripcion}
                                </div>

                                <Button
                                  className="botonPositivo"
                                  onClick={() => addToShoppingCar(dat)}
                                >
                                  <AddShoppingCartIcon fontSize="medium" />
                                </Button>
                              </div>
                            </Card>
                          </div>
                        </>
                      );
                    })
                  : null}
              </div>
            </div>
          </section>
          <hr className="my-0" />
        </main>
      </div>
    </div>
  );
}
