import React, { useState } from 'react';
import { List } from 'antd';
import { Typography, Descriptions, Select } from 'antd';
const { Paragraph } = Typography;
const { Option } = Select;

const QuestionListItem = props => {
  const [editState, setEditState] = useState({});

  const { item } = props;
  const ListItem = List.Item;
  const { text: correctAnswer, option_id: correctAnswerId } = item.options.find(
    ({ correct }) => correct
  );

  return (
    <ListItem>
      <>
        <Descriptions bordered size="small" layout="vertical">
          <Descriptions.Item label="Título">
            <Paragraph
              editable={{
                onChange: async title => {
                  await props.editQuestion(item._id, { title });
                }
              }}>
              {item.title}
            </Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Categoría">
            {editState[`${item._id}-category`] ? (
              <Select
                style={{ width: '100%' }}
                defaultValue={item.category._id}
                onChange={async category => {
                  await props.editQuestion(item._id, {
                    category
                  });
                  setEditState({
                    ...editState,
                    [`${item._id}-category`]: undefined
                  });
                }}>
                {props.categories.map(c => (
                  <Option key={`${item._id}-category-${c._id}`} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            ) : (
              <Paragraph
                onClick={() => {
                  setEditState({
                    ...editState,
                    [`${item._id}-category`]: true
                  });
                }}>
                {item.category.name}
              </Paragraph>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Respuesta Correcta">
            {editState[`${item._id}-correct`] ? (
              <Select
                style={{ width: '100%' }}
                defaultValue={correctAnswerId}
                onChange={async value => {
                  const newOptions = item.options.map(i => {
                    return { ...i, correct: i.option_id === value };
                  });
                  await props.editQuestion(item._id, {
                    options: newOptions
                  });
                  setEditState({
                    ...editState,
                    [`${item._id}-correct`]: undefined
                  });
                }}>
                {item.options.map(opt => (
                  <Option
                    key={`${item._id}-correct-${opt.option_id}`}
                    value={opt.option_id}>
                    {opt.text}
                  </Option>
                ))}
              </Select>
            ) : (
              <Paragraph
                onClick={() => {
                  setEditState({
                    ...editState,
                    [`${item._id}-correct`]: true
                  });
                }}>
                {correctAnswer}
              </Paragraph>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Enlace">
            <Paragraph
              editable={{
                onChange: async link => {
                  await props.editQuestion(item._id, { link });
                }
              }}>
              {item.link}
            </Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Trivia">
            <Paragraph
              editable={{
                onChange: async did_you_know => {
                  await props.editQuestion(item._id, { did_you_know });
                }
              }}>
              {item.did_you_know}
            </Paragraph>
          </Descriptions.Item>
          <Descriptions.Item label="Opciones">
            {item.options.map(opt => (
              <Paragraph
                key={`${item._id}-${opt.option_id}`}
                editable={{
                  onChange: async text => {
                    const newOptions = item.options.map(i => {
                      return i.option_id === opt.option_id
                        ? {
                            ...i,
                            text
                          }
                        : i;
                    });
                    await props.editQuestion(item._id, {
                      options: newOptions
                    });
                  }
                }}>
                {opt.text}
              </Paragraph>
            ))}
          </Descriptions.Item>
        </Descriptions>
      </>
    </ListItem>
  );
};

export default QuestionListItem;
