import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, message, Modal } from 'antd';

import { getAuthHeaders, http } from '../../../utils';
import { deleteCategory } from '../../../state/category/actions';

class DeleteCategoryButton extends Component {
  handleDeleteModal = category => {
    Modal.confirm({
      title: `¿Seguro que quieres eliminar la categoría: ${category.title}?`,
      okText: 'Confirmar',
      cancelText: 'Cancelar',
      onOk: () => this.deleteCategory(category._id)
    });
  };

  deleteCategory = async id => {
    const deleteMessage = message.loading('Eliminando categoría...', 0);
    try {
      await http.delete(`/category/${id}`, {
        headers: getAuthHeaders()
      });
      this.props.deleteCategory(id);
      deleteMessage();
      message.success('Categoría eliminada');
    } catch (error) {
      deleteMessage();
      message.error('No se pudo eliminar la categoría');
    }
  };
  render() {
    return (
      <Button
        icon="delete"
        type="danger"
        onClick={() => this.handleDeleteModal(this.props.category)}>
        Eliminar
      </Button>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteCategory: id => {
      dispatch(deleteCategory(id));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DeleteCategoryButton);

DeleteCategoryButton.propTypes = {
  category: PropTypes.object.isRequired
};
