import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { List, Spin } from 'antd';
import * as questionActions from '../../../state/question/actions';
import QuestionsStats from './QuestionsStats';
import { Paginator, QuestionListItem } from '../../../components';

class QuestionsList extends Component {
  componentDidMount() {
    if (!this.props.loadedPages.includes(1)) {
      this.props.loadFirstPage();
    }
    if (!this.props.questionsStats) {
      this.props.loadStats();
    }
  }

  nextPageHandler = nextPageNumber => {
    if (!this.props.loadedPages.includes(nextPageNumber)) {
      this.props.loadPage(nextPageNumber);
    } else {
      this.props.nextPage(nextPageNumber);
    }
  };

  render() {
    return (
      <Fragment>
        {this.props.loadingStats ? (
          <Spin
            style={{ display: 'block', justifyContent: 'center' }}
            tip="Cargando Estadisticas..."
          />
        ) : (
          this.props.questionsStats && (
            <QuestionsStats stats={this.props.questionsStats} />
          )
        )}
        {this.props.loadingFirstPage ? (
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
            <List
              loading={this.props.loadingNextPage}
              itemLayout="vertical"
              dataSource={(this.props.currentPage || {}).questions}
              renderItem={item => (
                <QuestionListItem key={item._id} item={item} />
              )}
            />
            <Paginator
              current={this.props.currentPageNumber}
              total={this.props.totalItems}
              onClickNextPage={this.nextPageHandler}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.question.currentPage,
    currentPageNumber: state.question.currentPageNumber,
    totalPages: state.question.totalPages,
    totalItems: state.question.totalItems,
    loadedPages: state.question.loadedPages,
    loadingFirstPage: state.ui.questionList.loading,
    loadingNextPage: state.ui.questionList.loadingNextQuestions,
    questionsStats: state.question.stats,
    loadingStats: state.ui.questionList.loadingStats,
    errorStats: state.ui.questionList.errorStats,
    errorMessageStats: state.ui.questionList.errorMessageStats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadFirstPage: () => {
      dispatch(questionActions.loadFirstPage());
    },
    loadPage: pageNumber => {
      dispatch(questionActions.loadPage(pageNumber));
    },
    nextPage: pageNumber => {
      dispatch(questionActions.nextPage(pageNumber));
    },
    loadStats: () => {
      dispatch(questionActions.loadStats());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsList);
