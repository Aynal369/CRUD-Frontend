import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="bg-light shadow-sm">
        <div className="container">
          <div className="row">
            <ul className="list-unstyled d-flex justify-content-center mt-3">
              <li className="mx-3">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="mx-3">
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
