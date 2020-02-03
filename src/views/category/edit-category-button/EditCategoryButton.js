import React, { Component, Fragment } from 'react';
import { Button, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import CategoryForm from '../category-form/CategoryForm';

class EditCategoryButton extends Component {
  state = { error: false, modalIsOpen: false };

  setModalState = open => this.setState({ modalIsOpen: open });

  submitHandler = ({ name }, setSubmitting) => {
    const loadingMessage = message.loading('Guardando cambios...');
    setSubmitting(true);
    this.setState({ error: false }, async () => {
      try {
        await this.props.editCategory(this.props.category._id, { name });
        message.success('Cambios guardados');
        this.setState({ modalIsOpen: false });
      } catch (error) {
        this.setState({ error: true });
        message.error('Ocurrió un error intentando guardar los cambios');
      } finally {
        loadingMessage();
        setSubmitting(false);
      }
    });
  };

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
          <CategoryForm
            initialValues={{ name: category.name }}
            buttonText="Guardar"
            onSubmit={this.submitHandler}
          />
        </Modal>
      </Fragment>
    );
  }
}

export default EditCategoryButton;

EditCategoryButton.propTypes = {
  category: PropTypes.object.isRequired
};
