import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, message, Modal } from 'antd';

class DeleteCategoryButton extends Component {
  handleDeleteModal = category => {
    Modal.confirm({
      title: `¿Seguro que quieres eliminar la categoría: ${category.name}?`,
      okText: 'Confirmar',
      cancelText: 'Cancelar',
      onOk: () => this.deleteCategory(category._id)
    });
  };

  deleteCategory = async id => {
    const deleteMessage = message.loading('Eliminando categoría...', 0);
    try {
      await this.props.deleteCategory(id);
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

export default DeleteCategoryButton;

DeleteCategoryButton.propTypes = {
  category: PropTypes.object.isRequired
};
