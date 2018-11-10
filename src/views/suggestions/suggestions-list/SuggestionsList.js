import React, { Fragment } from 'react';
import { List } from 'antd';
import Paginator from '../../../components/paginator/Paginator';
import SuggestionListItem from '../suggestion-list-item/SuggestionListItem';

const SuggestionsList = props => {
  return (
    <Fragment>
      <Paginator
        current={props.currentPage}
        total={props.totalPages}
        onClickNextPage={props.onClickNextPage}
      />
      <List
        loading={props.loading}
        itemLayout="vertical"
        dataSource={props.suggestions}
        renderItem={item => <SuggestionListItem key={item._id} item={item} />}
      />
      <Paginator
        current={props.currentPage}
        total={props.totalPages}
        onClickNextPage={props.onClickNextPage}
      />
    </Fragment>
  );
};

export default SuggestionsList;
