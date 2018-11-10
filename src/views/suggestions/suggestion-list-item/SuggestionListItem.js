import React, { Fragment } from 'react';
import { List, Tag, Button } from 'antd';

const SuggestionListItem = ({ item }) => {
  const ListItem = List.Item;
  const { difficulty } = item;
  let difficultyText;
  if (difficulty === 'easy') {
    difficultyText = 'Fácil';
  }
  if (difficulty === 'medium') {
    difficultyText = 'Media';
  }
  if (difficulty === 'hard') {
    difficultyText = 'Difícil';
  }

  const description = (
    <Fragment>
      <Tag color="#108ee9">{item.category.title}</Tag>
      <Tag
        color={
          difficulty === 'easy'
            ? 'green'
            : difficulty === 'medium'
              ? 'gold'
              : 'red'
        }>
        {difficultyText}
      </Tag>
    </Fragment>
  );
  return (
    <ListItem>
      <ListItem.Meta title={item.title} description={description} />
      {item.options.map(option => (
        <Button
          key={option.option_id}
          type="default"
          style={{ margin: '0 3px' }}>
          {' '}
          {option.text}{' '}
        </Button>
      ))}
    </ListItem>
  );
};

export default SuggestionListItem;
