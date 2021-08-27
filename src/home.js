import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import "bootstrap/dist/css/bootstrap.css";

import Products from "./productos.js";

export default function Home() {
  return (
    <div>
      <Router>
        {/* Navbar*/}
        <nav className="navbar navbar-marketing navbar-expand-lg navbar-light bg-transparent fixed-top navbarCustom">
          <div className="container">
            <a className="navbar-brand text-dark" href="index.html">
              DOLLARCITY
            </a>
            <button
              class="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <DropdownButton
                title="Dropdown button"
                class="navbar-toggler collapsed"
              >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
              <i data-feather="menu"></i>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto mr-lg-5">
                <li className="nav-item">
                  <Link className="nav-link" to="">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    Productos
                  </Link>
                </li>
                <li className="nav-item dropdown dropdown-xl no-caret">
                  <Link className="nav-link" to="">
                    Solicitudes de empleo
                  </Link>
                </li>
                <li className="nav-item dropdown dropdown-xl no-caret">
                  <AmplifySignOut />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main>
          <Route path="/products" component={Products} exact />
        </main>
        <div id="layoutDefault_footer">
          <footer className="footer pt-10 pb-5 mt-auto bg-light footer-light">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6 small">
                  Copyright © Dollarcity 2021
                </div>
                <div className="col-md-6 text-md-right small">
                  <a href="#!">Privacy Policy</a>·
                  <a href="#!">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
}
