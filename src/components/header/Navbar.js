import React from "react";
import "../header/navbar.css";
// import logo from'./logo.png'
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          <h1>SNAPPY</h1>
        </a>
        <div className="navbar-end is text-right">

          <div className="buttons">
            <a
              className="button is-primary"
              onClick={() => navigate("/signup")}
            >
              <strong>Sign up</strong>
            </a>
            <a className="button is-light" onClick={() => navigate("/")}>
              Log in
            </a>
            <label className="checkbox navbar-end">
              <input type="checkbox" />
              Enable Dark Mode
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
