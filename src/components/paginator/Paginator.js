import React from 'react';
import { Pagination } from 'antd';

const Paginator = props => {
  return (
    <Pagination
      defaultCurrent={1}
      current={props.current}
      total={props.total}
      onChange={page => props.onClickNextPage(page)}
      style={{ ...props.style }}
    />
  );
};

export default Paginator;
