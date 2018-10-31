import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from './login-form/LoginForm';
import * as userActions from "../../state/user/actions";

class Login extends Component {

  submitHandler = user => {
    this.props.login(user);
  };


  render() {

    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />
    }

    return (
      <div className="columns is-mobile is-tablet is-desktop is-centered">
        <div className="column is-10-mobile is-6-tablet is-6-desktop ">
          <LoginForm loading={this.props.loading} error={this.props.error} errorMessage={this.props.errorMessage} submitHandler={this.submitHandler} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.ui.login.loading,
    isAuthenticated: state.user.token !== null,
    error: state.ui.login.error,
    errorMessage: state.ui.login.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: loginData => {
      dispatch(userActions.loginStart(loginData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
