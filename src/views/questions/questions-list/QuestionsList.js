import React, { Fragment } from 'react';
import { List, Spin, Input } from 'antd';
import QuestionsStats from './QuestionsStats';
import { QuestionListItem } from '../../../components';
import { CategoryProvider } from '../../../providers';
const { Search } = Input;

const QuestionsList = props => {
  return (
    <Fragment>
      {/* {this.props.loadingStats ? (
      <Spin
        style={{
          display: 'block',
          justifyContent: 'center',
          marginTop: '80px'
        }}
        tip="Cargando Estadisticas..."
      />
    ) : (
      this.props.questionsStats && (
        <QuestionsStats stats={this.props.questionsStats} />
      )
    )} */}
      {props.loadingQuestions ? (
        <Spin
          style={{
            display: 'block',
            justifyContent: 'center',
            marginTop: '25px'
          }}
          tip="Cargando Preguntas..."
        />
      ) : (
        <Fragment>
          <Search
            placeholder="Search Question"
            onSearch={async value => {
              await props.getQuestions({ search: value });
            }}
            enterButton
          />
          <CategoryProvider
            render={categoryProps => (
              <List
                itemLayout="vertical"
                dataSource={props.questions}
                renderItem={item => (
                  <QuestionListItem
                    {...categoryProps}
                    key={item._id}
                    editQuestion={props.editQuestion}
                    item={item}
                  />
                )}
                pagination={{
                  onChange: () => {
                    window.scrollTo({ top: true, behavior: 'smooth' });
                  }
                }}
              />
            )}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default QuestionsList;
