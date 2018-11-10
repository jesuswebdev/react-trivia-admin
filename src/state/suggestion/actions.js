import * as actionTypes from './actionTypes';
import { PAGE_ITEM_COUNT } from '../../config';
import { getAuthHeaders, http } from '../../utils';
import * as uiSuggestionListActions from '../ui/suggestion-list/actions';
import * as uiSuggestionModalActions from '../ui/suggestion-modal/actions';

export const loadFirstPage = () => dispatch => {
  dispatch(uiSuggestionListActions.startLoadingSuggestions());
  http
    .get(`/questions/suggestions?limit=${PAGE_ITEM_COUNT}`, {
      headers: getAuthHeaders()
    })
    .then(({ data }) => {
      dispatch(loadFirstPageSuccess(data));
      dispatch(uiSuggestionListActions.finishLoadingSuggestions());
    })
    .catch(({ response: { data } }) => {
      dispatch(uiSuggestionListActions.errorLoadingSuggestions(data));
    });
};

const loadFirstPageSuccess = data => {
  return {
    type: actionTypes.LOAD_FIRST_PAGE_SUCCESS,
    payload: data
  };
};

export const loadNextPage = page => dispatch => {
  let offset = PAGE_ITEM_COUNT * page - PAGE_ITEM_COUNT;
  offset = offset > 0 ? `&offset=${offset}` : '';
  dispatch(setPageNumber(page));
  dispatch(uiSuggestionListActions.startLoadingNextSuggestions());
  http
    .get(`/questions/suggestions?limit=${PAGE_ITEM_COUNT}${offset}`, {
      headers: getAuthHeaders()
    })
    .then(({ data }) => {
      dispatch(loadNextPageSuccess(data, page));
      dispatch(uiSuggestionListActions.finishLoadingNextSuggestions());
    })
    .catch(({ response: { data } }) => {
      dispatch(uiSuggestionListActions.errorLoadingNextSuggestions(data));
    });
};

const loadNextPageSuccess = (data, number) => {
  return {
    type: actionTypes.LOAD_NEXT_PAGE_SUCCESS,
    payload: { ...data, number }
  };
};

export const setPageNumber = page => {
  return {
    type: actionTypes.SET_PAGE_NUMBER,
    payload: page
  };
};

export const openModal = suggestionId => dispatch => {
  dispatch(openSuggestionModal(suggestionId));
  dispatch(uiSuggestionModalActions.uiShowSuggestionModal());
};

const openSuggestionModal = suggestionId => {
  return {
    type: actionTypes.OPEN_MODAL,
    payload: suggestionId
  };
};

export const closeModal = () => dispatch => {
  dispatch(uiSuggestionModalActions.uiCloseSuggestionModal());
  dispatch(closeSuggestionModal());
};

const closeSuggestionModal = () => {
  return {
    type: actionTypes.CLOSE_MODAL
  };
};

const clearLoadedPages = () => {
  return {
    type: actionTypes.CLEAR_LOADED_PAGES
  };
};

export const changeSuggestionState = (id, state, page) => dispatch => {
  http
    .post(`/questions/suggestions/${id}/${state}`, null, {
      headers: getAuthHeaders()
    })
    .then(({ data }) => {
      dispatch(closeModal());
      dispatch(uiSuggestionListActions.startLoadingNextSuggestions());
      http
        .get('/questions/suggestions/count')
        .then(({ data: { count } }) => {
          const totalPages = Math.ceil(count / PAGE_ITEM_COUNT);
          const pageNumber = page > totalPages ? page - 1 : page;
          dispatch(clearLoadedPages());
          dispatch(loadNextPage(pageNumber));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
