import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/ui/input/Input";
import * as userActions from "../../state/user/actions";

class Login extends Component {
  state = {
    loginForm: {
      controls: {
        email: {
          name: "email",
          label: "Correo Electrónico",
          type: "email",
          placeholder: "Correo electrónico...",
          value: "",
          disabled: false,
          rules: {
            email: true,
            minLength: 8,
            required: true
          },
          touched: false,
          dirty: false,
          errors: []
        },
        password: {
          name: "password",
          label: "Contraseña",
          type: "password",
          placeholder: "Contraseña...",
          value: "",
          rules: {
            email: true,
            minLength: 6,
            required: true
          },
          touched: false,
          dirty: false,
          errors: []
        }
      },
      touched: false,
      dirty: false,
      valid: false
    }
  };

  onSubmitHandler = event => {
    event.preventDefault();
    let user = {
      email: this.state.loginForm.controls.email.value,
      password: this.state.loginForm.controls.password.value
    };

    this.props.login(user);
  };

  onChangeHandler = event => {
    let form = { ...this.state.loginForm };
    let control = { ...form.controls[event.target.name] };
    control.value = event.target.value;
    control.dirty = true;
    form.controls[event.target.name] = control;
    form.dirty = true;
    this.setState({ loginForm: form });
  };

  onBlurHandler = event => {
    let form = { ...this.state.loginForm };
    let control = { ...form.controls[event.target.name] };
    control.touched = true;
    form.controls[event.target.name] = control;
    form.touched = true;
    this.setState({ loginForm: form });
  };

  render() {

    if (this.props.user) {
      return <Redirect to="/dashboard" />
    }

    let controls = { ...this.state.loginForm.controls };
    let inputs = Object.keys(controls).map(control => {
      return (
        <Input
          {...controls[control]}
          key={control}
          loading={this.props.loading}
          onChangeHandler={e => this.onChangeHandler(e)}
          onBlurHandler={e => this.onBlurHandler(e)}
        />
      );
    });

    return (
      <div className="columns is-centered">
        <div className="column is-6">
          <div className="card">
            <div className="card-header">
              <div className="card-header-title">Iniciar sesion</div>
            </div>
            <div className="card-content">
              <div className="content">
                <form onSubmit={this.onSubmitHandler}>
                  {inputs}
                  <button
                    type="submit"
                    className={[
                      "button",
                      "is-link",
                      "is-fullwidth",
                      this.props.loading ? "is-loading" : ""
                    ].join(" ")}>
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.ui.login.loading,
    user: state.user.id
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
