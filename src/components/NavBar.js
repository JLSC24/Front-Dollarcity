import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import MenuIcon from "@material-ui/icons/Menu";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            DOLLARCITY
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/products"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/job_application"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Solicitudes de empleo
              </NavLink>
            </li>
            <li className="nav-item logout">
              <AmplifySignOut buttonText="Salir" />
            </li>
          </ul>
          <div className="nav-icon botonFijo" onClick={handleClick}>
            <MenuIcon className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
