import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div className="columns">
        <div className="column is-8-desktop">
        <Link to="/questions/new" className="button is-link">Crear una nueva pregunta</Link>
        <Link to="/category/new" className="button is-link">Crear una nueva categoria</Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;