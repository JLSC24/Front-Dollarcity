import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/NavBar";

import Products from "./Pages/Productos.js";
import JobAplication from "./Pages/JobAplication";

export default function Home() {
  return (
    <div>
      <Router>
        {/* Navbar*/}
        <NavBar />
        <main>
          <Route path="/products" component={Products} exact />
          <Route path="/job_application" component={JobAplication} exact />
        </main>
        <div id="layoutDefault_footer">
          <footer
            className="footer pt-10 pb-5 mt-auto footer-light"
            style={{ backgroundColor: "#8bc34a", color: "black" }}
          >
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
