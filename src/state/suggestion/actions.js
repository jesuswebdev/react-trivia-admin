import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_URL, PAGE_ITEM_COUNT } from '../../config';
import { getAuthHeaders } from '../../utils';

export const loadFirstPage = () => dispatch => {
	axios({
		method: 'get',
		url: `${API_URL}/questions/suggestions`,
		headers: getAuthHeaders()
	})
	.then(({data}) => {
		dispatch(loadFirstPageSuccess(data));
	})
	.catch((error) => {
		console.log(error);
	})
};

const loadFirstPageSuccess = (data) => {
	return {
		type: actionTypes.LOAD_FIRST_PAGE_SUCCESS,
		payload: data
	}
}