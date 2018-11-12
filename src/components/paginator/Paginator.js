import React from 'react';
import { Pagination } from 'antd';

const Paginator = props => {
  return (
    <Pagination
      defaultCurrent={1}
      current={props.current}
      total={props.total}
      hideOnSinglePage
      onChange={page => {
        props.onClickNextPage(page);
        window.scrollTo({ top: true, behavior: 'smooth' });
      }}
      style={{ textAlign: 'center' }}
    />
  );
};

export default Paginator;
