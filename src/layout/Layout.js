import React, { Component } from "react";
import Aux from "../components/aux/Aux";
import Header from "./Header";

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Header />
        <section className="section">
        	<div className="container">
            {this.props.children}
        	</div>
        </section>
      </Aux>
    );
  }
}

export default Layout;
