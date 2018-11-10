import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginForm from './login-form/LoginForm';
import { loginSuccess } from '../../state/user/actions';
import { http } from '../../utils';
import { Row, Col } from 'antd';

class Login extends Component {
  state = {
    error: false,
    errorMessage: ''
  };

  submitHandler = (user, setSubmitting) => {
    this.setState({ error: false, errorMessage: '' });
    setSubmitting(true);
    http
      .post('/users/login', user)
      .then(({ data }) => {
        this.props.loginSuccess(data);
        setSubmitting(false);
      })
      .catch(({ response: { data } = {} }) => {
        this.setState({ error: true, errorMessage: data.message });
        setSubmitting(false);
      });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Row type="flex" justify="center">
        <Col xs={22} sm={16} md={10} lg={10}>
          <LoginForm
            error={this.state.error}
            errorMessage={this.state.errorMessage}
            submitHandler={this.submitHandler}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginSuccess: loginData => {
      dispatch(loginSuccess(loginData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
