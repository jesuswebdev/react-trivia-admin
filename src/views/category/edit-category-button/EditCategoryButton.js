import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, message } from 'antd';
import PropTypes from 'prop-types';

import { http, getAuthHeaders } from '../../../utils';
import CategoryForm from '../category-form/CategoryForm';
import { editCategorySuccess } from '../../../state/category/actions';

class EditCategoryButton extends Component {
  state = { error: false, modalIsOpen: false };

  setModalState = open => this.setState({ modalIsOpen: open });

  submitHandler = ({ name }, setSubmitting) => {
    const loadingMessage = message.loading('Guardando cambios...');
    setSubmitting(true);
    this.setState({ error: false }, async () => {
      try {
        await http.put(
          `/category/${this.props.category._id}`,
          { title: name },
          { headers: getAuthHeaders() }
        );
        message.success('Cambios guardados');
        this.props.editSuccess(this.props.category._id, name);
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
            initialValues={{ name: category.title }}
            buttonText="Guardar"
            onSubmit={this.submitHandler}
          />
        </Modal>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editSuccess: (id, name) => {
      dispatch(editCategorySuccess(id, name));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditCategoryButton);

EditCategoryButton.propTypes = {
  category: PropTypes.object.isRequired
};
