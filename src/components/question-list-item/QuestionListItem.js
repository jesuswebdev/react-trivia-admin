import React, { Component, Fragment } from 'react';
import { List, Tag, Button } from 'antd';
import DifficultyTag from '../difficulty-tag/DifficultyTag';

class QuestionListItem extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.item._id !== this.props.item._id;
  }
  render() {
    const { item } = this.props;
    const ListItem = List.Item;
    const { difficulty } = item;
    const description = (
      <Fragment>
        <Tag color="#108ee9">{item.category.title}</Tag>
        <DifficultyTag difficulty={difficulty} full />
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
            style={{ margin: '3px' }}>
            {' '}
            {option.text}{' '}
          </Button>
        ))}
      </ListItem>
    );
  }
}

export default QuestionListItem;
