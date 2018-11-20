import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as suggestionsActions from '../../state/suggestion/actions';
import { fetchCategories } from '../../state/category/actions';
import SuggestionsList from './suggestions-list/SuggestionsList';
import SuggestionModal from './suggestion-modal/SuggestionModal';
import { Row, Col, Spin } from 'antd';

class Suggestions extends Component {
  componentDidMount() {
    if (!this.props.loadedPages.includes(1)) {
      this.props.loadFirstPage();
    }
    this.props.loadCategories();
  }

  handleNextPage = page => {
    if (!this.props.loadedPages.includes(page)) {
      this.props.loadNextPage(page);
    } else {
      this.props.setPageNumber(page);
    }
  };

  handleOpenModal = suggestionId => {
    this.props.openModal(suggestionId);
  };

  handleCloseModal = () => {
    this.props.closeModal();
  };

  handleSuggestionState = (id, state, page) => {
    this.props.setSuggestionState(id, state, page);
  };

  render() {
    if (this.props.loadingSuggestions) {
      return (
        <Spin
          style={{
            display: 'block',
            justifyContent: 'center',
            marginTop: '80px'
          }}
          tip="Cargando Preguntas..."
        />
      );
    }
    if (!this.props.totalPages && !this.props.loadingSuggestions) {
      return <p style={{ textAlign: 'center' }}>No hay sugerencias</p>;
    }
    return (
      <Fragment>
        <Row type="flex" justify="center">
          <Col span={22}>
            <h1 style={{ fontSize: 'xx-large' }}>Preguntas Propuestas</h1>
            <SuggestionsList
              suggestions={(this.props.currentPage || {}).suggestions || []}
              currentPage={this.props.currentPageNumber}
              totalPages={this.props.totalPages}
              totalItems={this.props.totalItems}
              onClickNextPage={this.handleNextPage}
              loading={this.props.loadingNextSuggestions}
              openModal={this.handleOpenModal}
              setSuggestionState={this.handleSuggestionState}
            />
            {this.props.showModal && (
              <SuggestionModal
                active
                suggestion={this.props.activeSuggestion}
                closeModal={this.handleCloseModal}
                categories={this.props.categories || []}
                loadingCategories={this.props.loadingCategories}
                handleButton={this.handleModalButton}
                current={this.props.currentPageNumber}
              />
            )}
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPageNumber: state.suggestion.currentPageNumber,
    loadedPages: state.suggestion.loadedPages,
    totalPages: state.suggestion.totalPages,
    totalItems: state.suggestion.totalItems,
    currentPage: state.suggestion.currentPage,
    loadingSuggestions: state.ui.suggestionList.loading,
    loadingNextSuggestions: state.ui.suggestionList.loadingNextSuggestions,
    showModal: state.ui.suggestionModal.active,
    activeSuggestion: state.suggestion.activeSuggestion,
    categories: state.category.categories,
    loadingCategories: state.ui.newQuestion.loadingCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadFirstPage: () => {
      dispatch(suggestionsActions.loadFirstPage());
    },
    loadNextPage: number => {
      dispatch(suggestionsActions.loadNextPage(number));
    },
    setPageNumber: number => {
      dispatch(suggestionsActions.setPageNumber(number));
    },
    openModal: suggestionId => {
      dispatch(suggestionsActions.openModal(suggestionId));
    },
    closeModal: () => {
      dispatch(suggestionsActions.closeModal());
    },
    loadCategories: () => {
      dispatch(fetchCategories());
    },
    setSuggestionState: (id, state, page) => {
      dispatch(suggestionsActions.changeSuggestionState(id, state, page));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Suggestions);
