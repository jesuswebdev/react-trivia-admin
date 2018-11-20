import React, { Component, Fragment } from 'react';
import { Table, Tag, Button } from 'antd';
import Paginator from '../../../components/paginator/Paginator';

class SuggestionsList extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.currentPage !== this.props.currentPage) {
      return true;
    }
    if (nextProps.suggestions !== this.props.suggestions) {
      return true;
    }
    if (nextProps.loading !== this.props.loading) {
      return true;
    }

    return false;
  }

  render() {
    const { props } = this;

    const difficulty = {
      easy: { text: 'Fácil', color: 'green' },
      medium: { text: 'Media', color: 'gold' },
      hard: { text: 'Difícil', color: 'red' }
    };

    const columns = [
      { title: 'Pregunta', dataIndex: 'title' },
      {
        title: 'Categoría',
        dataIndex: 'category.title',
        align: 'center',
        render: text => <Tag color="#108ee9">{text}</Tag>
      },
      {
        title: 'Dificultad',
        dataIndex: 'difficulty',
        render: text => (
          <Tag color={difficulty[text].color}>{difficulty[text].text}</Tag>
        )
      },
      {
        title: 'Acciones',
        key: 'actions',
        render: (_, item) => (
          <Fragment>
            <Button shape="circle" icon="info" style={{ margin: '0px 4px' }} />
            <Button
              shape="circle"
              icon="check"
              style={{ margin: '0px 4px' }}
              onClick={() =>
                props.setSuggestionState(item._id, 'approve', props.currentPage)
              }
            />
            <Button
              shape="circle"
              icon="delete"
              style={{ margin: '0px 4px' }}
              onClick={() =>
                props.setSuggestionState(item._id, 'reject', props.currentPage)
              }
            />
          </Fragment>
        )
      }
    ];

    const pagination = (
      <Paginator
        current={props.currentPage}
        total={props.totalItems}
        onClickNextPage={props.onClickNextPage}
        style={{ textAlign: 'center' }}
      />
    );

    return (
      <Table
        dataSource={props.suggestions}
        columns={columns}
        rowKey={item => item._id}
        loading={props.loading}
        pagination={pagination}
      />
    );
  }
}

export default SuggestionsList;
