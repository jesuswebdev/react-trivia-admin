import React, { Fragment } from 'react';
import { Spin, Row, Col, Table, Button, Modal } from 'antd';
import DeleteCategoryButton from '../delete-category-button/DeleteCategoryButton';

const showInfoModal = item => {
  const content = (
    <Fragment>
      <p style={{ margin: '0px' }}>{`Preguntas totales: ${
        item.question_count
      }`}</p>
      <p style={{ margin: '0px' }}>{`Preguntas fáciles: ${
        item.total_easy_questions
      }`}</p>
      <p style={{ margin: '0px' }}>{`Preguntas medias: ${
        item.total_medium_questions
      }`}</p>
      <p style={{ margin: '0px' }}>{`Preguntas difíciles: ${
        item.total_hard_questions
      }`}</p>
    </Fragment>
  );
  Modal.info({
    title: item.title,
    content: content
  });
};

class CategoryList extends React.Component {
  render() {
    const { categories, loading, error } = this.props;
    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'title'
      },
      {
        title: 'Preguntas',
        dataIndex: 'question_count',
        align: 'center'
      },
      {
        title: 'Acciones',
        dataIndex: '_id',
        align: 'center',
        render: (_, item) => (
          <Fragment>
            <Button icon="info-circle" onClick={() => showInfoModal(item)}>
              Ver Info
            </Button>
            <Button icon="edit" style={{ margin: '0 5px' }}>
              Modificar
            </Button>
            {item.question_count === 0 && (
              <DeleteCategoryButton category={item} />
            )}
          </Fragment>
        )
      }
    ];
    if (error) {
      return <p>Ocurrió un error</p>;
    }
    if (loading) {
      return (
        <Spin
          style={{
            marginTop: '80px',
            display: 'block',
            justifyContent: 'center'
          }}
          tip="Cargando categorias..."
        />
      );
    }
    return (
      <Fragment>
        <h1 style={{ fontSize: 'xx-large', textAlign: 'center' }}>
          Categorías
        </h1>
        <Row type="flex" justify="center">
          <Col span={22}>
            <Table
              rowKey={item => item._id}
              columns={columns}
              dataSource={categories}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default CategoryList;
