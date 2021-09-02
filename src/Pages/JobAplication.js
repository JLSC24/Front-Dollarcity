import React, { useEffect } from "react";

import { Button, Row, Col, Form } from "react-bootstrap";
import { getPuesto } from "../contentfulFunctions";

export default function JobAplication() {
  const [dataLugares, setDataLugares] = React.useState(null);
  const [dataPuestos, setDataPuestos] = React.useState(null);
  const [dataCiudad, setDataCiudad] = React.useState(null);
  const [datDescripcion, setDatDescripcion] = React.useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      const result = await fetch(
        "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      let data = await result.json();
      setDataLugares(data);
    };
    const getDatPuestos = async () => {
      const result = await getPuesto();
      let data = result;
      console.log(data);
      setDataPuestos(data);
    };
    getDatPuestos();
    fetchdata();
  }, []);

  const cambiarCiudad = () => {
    let dep = document.getElementById("departamento").value;
    setDataCiudad(dataLugares[dep].ciudades);
  };

  const cambiarPuesto = () => {
    let puesto = document.getElementById("puesto").value;
    console.log(puesto);
    if (dataPuestos !== null) {
      dataPuestos.map((dat) => {
        if (dat.fields.nombre === puesto) {
          setDatDescripcion({
            description: dat.fields.descripcion,
            salario: dat.fields.salario,
          });
          return null;
        }
        return null;
      });
    }
  };

  const sendData = async (e) => {
    e.preventDefault();

    let data = [
      {
        name: document.getElementById("name").value,
        last_names: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        city: document.getElementById("city").value,
        job_title: document.getElementById("puesto").value,
        address: document.getElementById("address").value,
        cc: parseInt(document.getElementById("numDocID").value),
        gender: document.getElementById("gender").value,
        year_experiences: parseInt(document.getElementById("numYearXP").value),
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
      },
    ];

    console.log(JSON.stringify(data));

    fetch(
      "https://uz0m3atqdi.execute-api.us-east-2.amazonaws.com/dollarcity-api/job-applications/",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((data) => {
        console.log(data);
        if (data.status >= 200 && data.status <= 300) {
          window.alert(
            "HAS APLICADO A UNO DE NUESTROS PUESTOS. " +
              "\n" +
              "->> LA PACIENCIA ES UNA VIRTUD <<--" +
              "\n" +
              "NO NOS LLAMES NOSOTROS TE LLAMAMOS"
          );
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div id="layoutDefault">
      <div id="layoutDefault_content">
        <main>
          {/* Page Header*/}
          <header className="page-header page-header-ligth bg-img-repeat colorHeader">
            <div className="page-header-content">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-8 col-lg-10 text-center">
                    <h1 className="page-header-title">
                      ¿Quieres trabajar con nosotros?
                    </h1>
                    <p className="page-header-text mb-5">
                      Llena el formulario y te contactaremos
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
              <h2 className="mb-4">Formulario de solicitud</h2>
              <div className="row">
                <Form onSubmit={(e) => sendData(e)}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Nombre(s)</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Nombre(s)"
                        id="name"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>Apellido(s)</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Apellido(s)"
                        id="lastName"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Digite su correo electrónico"
                        id="email"
                      />
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                      <Form.Label>Documento de identidad</Form.Label>
                      <Form.Select required id="tipoDocID">
                        <option value="">
                          Seleccione tipo de documento de identidad
                        </option>
                        <option value="cc">C.C.</option>
                        <option value="ce">C.E.</option>
                        <option value="passport">Pasaporte</option>
                      </Form.Select>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                      <Form.Label>Número de documento de identidad</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Número de documento de identidad"
                        id="numDocID"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Genero</Form.Label>
                      <Form.Select id="gender">
                        <option value="">Seleccione su genero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Prefiero no decir</option>
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <hr />
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom02">
                      <Form.Label>Años de experiencia</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        placeholder="Número de años que tiene de experiencia laboral"
                        id="numYearXP"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="validationCustom02">
                      <Form.Label>Titulo</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Que nivel de estudio tiene (título académico)"
                        id="title"
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="validationCustom02">
                      <Form.Label>Puesto al que aspira</Form.Label>
                      <Form.Select onChange={cambiarPuesto} id="puesto">
                        <option value="">Elija el puesto</option>
                        {dataPuestos !== null
                          ? dataPuestos.map((data) => {
                              return (
                                <option
                                  value={data.fields.nombre}
                                  key={data.sys.id}
                                >
                                  {data.fields.nombre}
                                </option>
                              );
                            })
                          : null}
                      </Form.Select>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom02">
                      <Form.Label>Descripción de solicitud</Form.Label>
                      <textarea
                        className="form-control text-center"
                        placeholder="Descripción de su aplicación al puesto, cuentenos el porque"
                        rows="3"
                        id="description"
                      ></textarea>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label>
                      {datDescripcion !== null ? (
                        <>
                          <b>Descripción: </b>
                          {datDescripcion.description} <br />
                          <b>Salario: </b>
                          {datDescripcion.salario}
                        </>
                      ) : null}
                    </Form.Label>
                  </Row>
                  <hr />
                  <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>Dirección</Form.Label>
                      <Form.Control
                        placeholder="Inserte su dirección aquí"
                        id="address"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Departamento</Form.Label>
                      <Form.Select onChange={cambiarCiudad} id="departamento">
                        <option value="">Elija el departamento</option>
                        {dataLugares !== null
                          ? dataLugares.map((data) => {
                              return (
                                <option value={data.id} key={data.id}>
                                  {data.departamento}
                                </option>
                              );
                            })
                          : null}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Select id="city">
                        <option value="">Elija su ciudad</option>
                        {dataCiudad !== null
                          ? dataCiudad.map((data, index) => {
                              return (
                                <option value={data} key={data}>
                                  {data}
                                </option>
                              );
                            })
                          : null}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Codigo postal</Form.Label>
                      <Form.Control id="zip" />
                    </Form.Group>
                  </Row>

                  <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check
                      required
                      type="checkbox"
                      label="Acepto el tratamiento de datos personales"
                    />
                  </Form.Group>

                  <Button className="botonPositivo" type="submit">
                    Enviar
                  </Button>
                </Form>
              </div>
            </div>
          </section>
          <hr className="my-0" />
        </main>
      </div>
    </div>
  );
}
