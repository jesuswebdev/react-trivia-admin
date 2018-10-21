import React, { Component } from "react";
import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./views/login/Login";
import Dashboard from "./views/dashboard/Dashboard";
import NewQuestion from "./views/questions/new-question/NewQuestion";
import Layout from "./layout/Layout";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/questions/new" component={NewQuestion} />
        <Redirect to="/dashboard" />
      </Switch>
    );

    if (!this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Login} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.token !== null
  };
};

export default connect(mapStateToProps)(App);
