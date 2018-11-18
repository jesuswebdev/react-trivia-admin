import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const DifficultyTag = ({ difficulty, full }) => {
  let tag = {};

  switch (difficulty) {
    case 'easy':
      tag = { color: 'green', text: 'Fácil' };
      break;
    case 'medium':
      tag = { color: 'gold', text: 'Media' };
      break;
    case 'hard':
      tag = { color: 'red', text: 'Difícil' };
      break;
    default:
      tag = {};
  }

  return (
    <Tag color={tag.color}>{`${full ? 'Dificultad: ' : ''}${tag.text}`}</Tag>
  );
};

export default DifficultyTag;

DifficultyTag.propTypes = {
  difficulty: PropTypes.string.isRequired,
  full: PropTypes.bool
};

DifficultyTag.defaultProps = {
  full: false
};
