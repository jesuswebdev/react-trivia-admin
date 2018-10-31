import * as questionActions from './actionTypes';
import * as uiNewQuestionActions from '../ui/new-question/actions';
import * as uiQuestionListActions from '../ui/question-list/actions';

import axios from 'axios';
import { API_URL, PAGE_ITEM_COUNT } from '../../config';

const getAuthHeaders = () => {
    const {token} = JSON.parse(localStorage.getItem('userData'));
    return {
        'Authorization': 'Bearer ' + token
    }
}

export const saveQuestionStart = (question) => dispatch => {

    console.log(question);

    dispatch(uiNewQuestionActions.questionSentStart());

    
    axios({
        method: 'post',
        url: 'http://localhost:8080/questions',
        headers: getAuthHeaders(),
        data: question
    })
    .then(({data}) => {
        console.log(data);
        dispatch(uiNewQuestionActions.questionSentFinish());
    })
    .catch(({response: {data}}) => {
        console.log(data);
        dispatch(uiNewQuestionActions.questionSentFail(data));
    });
}

export const saveQuestionSuccess = (question) => {
    return {
        type: questionActions.SAVE_QUESTION_SUCCESS
    }
}

export const saveQuestionFail = (error) => {
    return {
        type: questionActions.SAVE_QUESTION_FAIL,
        error
    }
}

export const loadFirstPage = () => dispatch => {

    dispatch(uiQuestionListActions.startLoadingQuestions());
    axios({
        method: 'get',
        url: `${API_URL}/questions?limit=${PAGE_ITEM_COUNT}`,
        headers: getAuthHeaders()
    })
    .then(({data}) => {
        dispatch(loadFirstPageSuccess(data));
        dispatch(uiQuestionListActions.finishLoadingQuestions());
    })
    .catch(({response: {data} = {}}) => {
        dispatch(uiQuestionListActions.errorLoadingQuestions(data));
    });
}

const loadFirstPageSuccess = (data) => {
    return {
        type: questionActions.LOAD_FIRST_PAGE_SUCCESS,
        payload: data
    }
}

export const loadPage = (number) => dispatch => {

    dispatch(setPageNumber(number));
    dispatch(uiQuestionListActions.startLoadingNextQuestions());
    axios({
        method: 'get',
        url: `${API_URL}/questions?limit=${PAGE_ITEM_COUNT}&offset=${(number*PAGE_ITEM_COUNT) - PAGE_ITEM_COUNT}`,
        headers: getAuthHeaders()
    })
    .then(({data}) => {
        dispatch(loadPageSuccess(data, number));
        dispatch(uiQuestionListActions.finishLoadingNextQuestions());
    })
    .catch(({response: {data} = {}}) => {
        dispatch(uiQuestionListActions.errorLoadingNextQuestions(data));
    });
}

const loadPageSuccess = (data, number) => {
    return {
        type: questionActions.LOAD_PAGE_SUCCESS,
        payload: {
            ...data,
            number
        }
    }
}

export const nextPage = (number) => {
    return {
        type: questionActions.NEXT_PAGE,
        payload: number
    }
}

const setPageNumber = (number) => {
    return {
        type: questionActions.SET_PAGE_NUMBER,
        payload: number
    }
}

export const loadStats = () => dispatch => {
    dispatch(uiQuestionListActions.startLoadingStats());
    axios({
        method: 'get',
        url: `${API_URL}/questions/stats`,
        headers: getAuthHeaders()
    })
    .then(({data}) => {
        dispatch(loadStatsSuccess(data));
        dispatch(uiQuestionListActions.finishLoadingStats());
    })
    .catch(({response: {data} = {}}) => {
        dispatch(uiQuestionListActions.errorLoadingStats(data));
    });
}

const loadStatsSuccess = (stats) => {
    return {
        type: questionActions.LOAD_STATS_SUCCESS,
        payload: stats
    }
}