import React, { Component } from "react";
import Aux from "../components/aux/Aux";
import Header from "./Header";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Header />
        <div className="container">{this.props.children}</div>
      </Aux>
    );
  }
}

export default Layout;
