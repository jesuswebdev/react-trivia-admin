import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';

const showInfoModal = item => {
  const content = (
    <Fragment>
      <p style={{ margin: '0px' }}>{`Preguntas totales: ${
        item.question_count
      }`}</p>
      <p style={{ margin: '0px' }}>{`Preguntas fáciles: ${
        item.total_easy_questions
      }`}</p>
      <p style={{ margin: '0px' }}>{`Preguntas medias: ${
        item.total_medium_questions
      }`}</p>
      <p style={{ margin: '0px' }}>{`Preguntas difíciles: ${
        item.total_hard_questions
      }`}</p>
    </Fragment>
  );
  Modal.info({
    title: item.title,
    content: content
  });
};

const CategoryInfoButton = ({ category }) => (
  <Button icon="info-circle" onClick={() => showInfoModal(category)}>
    Ver Info
  </Button>
);

export default CategoryInfoButton;

CategoryInfoButton.propTypes = {
  category: PropTypes.object.isRequired
};
