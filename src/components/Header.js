import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favoris"
              className={(nav) => (nav.isActive ? "nav-active" : "")}
            >
              Mes Favoris
            </NavLink>
          </li>
        </ul>
      </nav>
      <h1>React Movie</h1>
    </div>
  );
};

export default Header;