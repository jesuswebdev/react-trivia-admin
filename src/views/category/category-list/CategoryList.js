import React, { Fragment } from 'react';
import { Spin, Row, Col, Table, Button } from 'antd';

const CategoryList = ({ categories, loading, error }) => {
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
      render: text => (
        <Fragment>
          <Button icon="info-circle">Ver Info</Button>
          <Button icon="edit" style={{ margin: '0 5px' }}>
            Modificar
          </Button>
          <Button icon="delete" type="danger">
            Eliminar
          </Button>
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
      <h1 style={{ fontSize: 'xx-large', textAlign: 'center' }}>Categorías</h1>
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
};

export default CategoryList;
