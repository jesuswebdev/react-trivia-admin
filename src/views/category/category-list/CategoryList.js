import React, { Fragment } from 'react';
import { Spin, Row, Col, Table } from 'antd';
import DeleteCategoryButton from '../delete-category-button/DeleteCategoryButton';
import EditCategoryButton from '../edit-category-button/EditCategoryButton';
import CategoryInfoButton from '../category-info-button/CategoryInfoButton';

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
            <CategoryInfoButton category={item} />
            <EditCategoryButton category={item} />
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
