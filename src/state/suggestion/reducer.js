import * as actionTypes from './actionTypes';
import { PAGE_ITEM_COUNT } from '../../config';

const initialState = {
  pages: [],
  currentPageNumber: 0,
  currentPage: {},
  loadedPages: [],
  totalItems: 0,
  totalPages: 0,
  activeSuggestion: {}
};

const loadFirstPageSuccess = (state, { payload }) => {
  let page = { number: 1, suggestions: payload.results };
  return {
    ...state,
    pages: state.pages.concat(page),
    currentPageNumber: 1,
    currentPage: page,
    totalItems: payload.results_count,
    loadedPages: state.loadedPages.concat(1),
    totalPages: Math.ceil(payload.results_count / PAGE_ITEM_COUNT)
  };
};

const loadNextPageSuccess = (state, { payload }) => {
  const totalPages = Math.ceil(payload.results_count / PAGE_ITEM_COUNT);
  const currentPageNumber =
    payload.number > totalPages ? payload.number - 1 : payload.number;
  const currentPage = {
    number: currentPageNumber,
    suggestions: payload.results
  };
  return {
    ...state,
    totalPages,
    currentPage,
    currentPageNumber,
    totalItems: payload.results_count,
    pages: state.pages.concat(currentPage),
    loadedPages: state.loadedPages.concat(payload.number).sort((a, b) => a > b)
  };
};

const setPageNumber = (state, { payload }) => {
  return {
    ...state,
    currentPageNumber: payload,
    currentPage: state.pages.find(page => page.number === payload)
  };
};

const openModal = (state, action) => {
  const [activeSuggestion] = state.currentPage.suggestions.filter(
    suggestion => suggestion._id === action.payload
  );
  return {
    ...state,
    activeSuggestion
  };
};

const closeModal = (state, action) => {
  return {
    ...state,
    activeSuggestion: {}
  };
};

const clearLoadedPages = (state, action) => {
  return {
    ...state,
    pages: [],
    loadedPages: []
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_FIRST_PAGE_SUCCESS:
      return loadFirstPageSuccess(state, action);
    case actionTypes.LOAD_NEXT_PAGE_SUCCESS:
      return loadNextPageSuccess(state, action);
    case actionTypes.SET_PAGE_NUMBER:
      return setPageNumber(state, action);
    case actionTypes.OPEN_MODAL:
      return openModal(state, action);
    case actionTypes.CLOSE_MODAL:
      return closeModal(state, action);
    case actionTypes.CLEAR_LOADED_PAGES:
      return clearLoadedPages(state, action);
    default:
      return state;
  }
};

export default reducer;
