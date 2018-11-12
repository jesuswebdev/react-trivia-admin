import React from 'react';
import { Card } from 'antd';

const CategoryListItem = ({ item }) => {
  return (
    <Card title={item.title} style={{ margin: '5px 0' }}>
      <p>Preguntas fáciles: {item.total_easy_questions}</p>
      <p>Preguntas medias: {item.total_medium_questions}</p>
      <p>Preguntas difíciles: {item.total_hard_questions}</p>
    </Card>
  );
};
export default CategoryListItem;
