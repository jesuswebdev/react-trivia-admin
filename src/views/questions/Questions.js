import React from 'react';
import { Row, Col } from 'antd';
import QuestionsList from './questions-list/QuestionsList';
import { QuestionsProvider } from '../../providers';

const Questions = () => {
  return (
    <QuestionsProvider
      render={props => (
        <Row type="flex" justify="center" style={{ padding: '32px' }}>
          <Col span={22}>
            <QuestionsList {...props} />
          </Col>
        </Row>
      )}
    />
  );
};

export default Questions;
