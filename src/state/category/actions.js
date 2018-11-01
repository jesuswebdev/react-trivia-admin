import * as categoryActions from './actionTypes';
import * as uiNewQuestionActions from '../ui/new-question/actions';
import axios from 'axios';
import {API_URL} from '../../config';
import { getAuthHeaders } from '../../utils';

export const fetchCategories = () => dispatch => {
    dispatch(uiNewQuestionActions.loadingCategoriesStart());
    axios({
        method: 'get',
        url: `${API_URL}/category`,
        headers: getAuthHeaders()
    })
    .then(({data}) => {
        dispatch(fetchCategoriesSuccess(data));
        dispatch(uiNewQuestionActions.loadingCategoriesFinish());
    })
    .catch(({response}) => {
        console.log(response)
    })
}

const fetchCategoriesSuccess = (data) => {
    return {
        type: categoryActions.FETCH_CATEGORIES_SUCCESS,
        payload: data
    }
}