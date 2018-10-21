import React from "react";
import {Link} from 'react-router-dom';

const Header = props => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
    <Link to="/" className="navbar-item">
    React Trivia
    </Link>

      <span
        role="button"
        className="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbar-menuitems">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </span>
    </div>

    <div id="navbar-menuitems" className="navbar-menu">
      <div className="navbar-end">
      Admin
      </div>
    </div>
  </nav>
);

export default Header;
