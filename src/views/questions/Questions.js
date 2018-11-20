import React from 'react';
import { Row, Col } from 'antd';
import QuestionsList from './questions-list/QuestionsList';

const Questions = () => {
  return (
    <Row type="flex" justify="center">
      <Col span={22}>
        <QuestionsList />
      </Col>
    </Row>
  );
};

export default Questions;
