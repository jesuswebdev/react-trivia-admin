import React, { Component, Fragment } from 'react';
import { List } from 'antd';
import Paginator from '../../../components/paginator/Paginator';
import { QuestionListItem } from '../../../components';

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
    return (
      <Fragment>
        <List
          loading={props.loading}
          itemLayout="vertical"
          dataSource={props.suggestions}
          renderItem={item => <QuestionListItem key={item._id} item={item} />}
        />
        <Paginator
          current={props.currentPage}
          total={props.totalItems}
          onClickNextPage={props.onClickNextPage}
          style={{ textAlign: 'center' }}
        />
      </Fragment>
    );
  }
}

export default SuggestionsList;
