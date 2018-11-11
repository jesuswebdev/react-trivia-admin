import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Modal } from 'antd';
import { http, getAuthHeaders } from '../../../utils';
import NewCategoryForm from './new-category-form/NewCategoryForm';

class NewCategory extends Component {
  state = {
    loading: false,
    error: false,
    showRedirect: false,
    showModal: false
  };

  send = ({ name }, setSubmitting) => {
    setSubmitting(true);
    this.setState({ loading: true, error: false }, async () => {
      try {
        const { data } = await http.post(
          '/category',
          { title: name },
          { headers: getAuthHeaders() }
        );
        this.setState({ loading: false, showModal: true }, () => {
          Modal.success({
            title: 'Éxito',
            content: 'La categoría fue creada con éxito',
            onOk: this.handleClose
          });
          setSubmitting(false);
        });
        setSubmitting(false);
      } catch ({ response: { data } = {} }) {
        this.setState({ loading: false, error: true }, () => {
          setSubmitting(false);
        });
      }
    });
  };

  handleClose = () => {
    this.setState({ showRedirect: true });
  };

  render() {
    const { loading, error } = this.state;
    return this.state.showRedirect ? (
      <Redirect to="/category" />
    ) : (
      <Row type="flex" justify="center">
        <Col xs={22} sm={16} md={10} lg={10}>
          <NewCategoryForm
            loading={loading}
            error={error}
            onSubmit={this.send}
          />
          {this.state.showModal && <Modal />}
        </Col>
      </Row>
    );
  }
}

export default NewCategory;
