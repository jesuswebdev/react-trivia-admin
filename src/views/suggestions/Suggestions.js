import React, { Fragment } from 'react';
import { QuestionsProvider, CategoryProvider } from '../../providers';
import SuggestionsList from './suggestions-list/SuggestionsList';
import { Row, Col } from 'antd';

const Suggestions = () => {
  return (
    <Fragment>
      <Row type="flex" justify="center">
        <Col span={22}>
          <h1 style={{ fontSize: 'xx-large' }}>Preguntas Propuestas</h1>
          <QuestionsProvider
            pending
            render={props => (
              <CategoryProvider
                render={categoryProps => (
                  <SuggestionsList {...props} {...categoryProps} />
                )}
              />
            )}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Suggestions;
