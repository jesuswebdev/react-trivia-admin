import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Modal, Card } from 'antd';
import { http, getAuthHeaders } from '../../../utils';
import CategoryForm from '../category-form/CategoryForm';

class NewCategory extends Component {
  state = {
    error: false,
    showRedirect: false
  };

  successModal = () =>
    Modal.success({
      title: 'Éxito',
      content: 'La categoría fue creada con éxito',
      onOk: this.handleClose
    });

  send = ({ name }, setSubmitting) => {
    setSubmitting(true);
    this.setState({ error: false }, async () => {
      try {
        await http.post(
          '/category',
          { name },
          { headers: getAuthHeaders(this.props.user.token) }
        );
        setSubmitting(false);
        this.successModal();
      } catch ({ response: { data } = {} }) {
        this.setState({ error: true }, () => {
          setSubmitting(false);
        });
      }
    });
  };

  handleClose = () => {
    this.setState({ showRedirect: true });
  };

  render() {
    const { error, showRedirect } = this.state;
    const errorMessage = 'Ocurrió un error al intentar crear la categoría';
    return showRedirect ? (
      <Redirect to="/category" />
    ) : (
      <Row type="flex" justify="center">
        <Col xs={22} sm={16} md={10} lg={8}>
          <Card style={{ marginTop: '80px' }}>
            <CategoryForm
              title="Nueva Categoría"
              error={error}
              onSubmit={this.send}
              errorMessage={errorMessage}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default connect(({ user }) => ({ user }))(NewCategory);
