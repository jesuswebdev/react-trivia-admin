import React, { Component, Fragment } from 'react';
import { List, Tag, Button } from 'antd';

class QuestionListItem extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.item._id !== this.props.item._id;
  }
  render() {
    const { item } = this.props;
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
          Dificultad: {difficultyText}
        </Tag>
      </Fragment>
    );
    return (
      <ListItem>
        <ListItem.Meta description={item.title} title={description} />
        {item.options.map(option => (
          <Button
            key={option.option_id}
            icon={option.correct_answer ? 'check' : null}
            type="default"
            style={{ margin: '0 3px' }}>
            {' '}
            {option.text}{' '}
          </Button>
        ))}
      </ListItem>
    );
  }
}

export default QuestionListItem;
