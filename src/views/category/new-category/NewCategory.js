import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Modal } from 'antd';
import { http, getAuthHeaders } from '../../../utils';
import NewCategoryForm from './new-category-form/NewCategoryForm';
import { createCategory } from '../../../state/category/actions';

class NewCategory extends Component {
  state = {
    error: false,
    showRedirect: false,
    showModal: false
  };

  send = ({ name }, setSubmitting) => {
    setSubmitting(true);
    this.setState({ error: false }, async () => {
      try {
        const { data } = await http.post(
          '/category',
          { title: name },
          { headers: getAuthHeaders() }
        );
        this.props.saveCategory(data);
        setSubmitting(false);
        this.setState({ showModal: true }, () => {
          Modal.success({
            title: 'Éxito',
            content: 'La categoría fue creada con éxito',
            onOk: this.handleClose
          });
        });
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
    const { error, showModal, showRedirect } = this.state;
    return showRedirect ? (
      <Redirect to="/category" />
    ) : (
      <Row type="flex" justify="center">
        <Col xs={22} sm={16} md={10} lg={10}>
          <NewCategoryForm error={error} onSubmit={this.send} />
          {showModal && <Modal />}
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveCategory: data => {
      dispatch(createCategory(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewCategory);
