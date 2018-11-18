import React, { Component, Fragment } from 'react';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';

import CategoryForm from '../category-form/CategoryForm';

class EditCategoryButton extends Component {
  state = { loading: false, error: false, modalIsOpen: false };

  setModalState = open => this.setState({ modalIsOpen: open });

  render() {
    const { modalIsOpen } = this.state;
    const { category } = this.props;
    return (
      <Fragment>
        <Button
          icon="edit"
          style={{ margin: '0 5px' }}
          onClick={() => this.setModalState(true)}>
          Modificar
        </Button>
        <Modal
          visible={modalIsOpen}
          destroyOnClose
          onCancel={() => this.setModalState(false)}
          footer={null}>
          <CategoryForm initialValues={{ name: category.title }} />
        </Modal>
      </Fragment>
    );
  }
}

export default EditCategoryButton;

EditCategoryButton.propTypes = {
  category: PropTypes.object.isRequired
};
