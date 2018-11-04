import React, { Component, Fragment } from 'react';
import Header from './Header';

class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <section className="section">
          <div className="container">{this.props.children}</div>
        </section>
      </Fragment>
    );
  }
}

export default Layout;
