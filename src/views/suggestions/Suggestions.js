import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as suggestionsActions from '../../state/suggestion/actions';

class Suggestions extends Component {

	componentDidMount() {
		if(!this.props.loadedPages.includes(1)){
			this.props.loadFirstPage();
		}
	}

	render() {
		return (<p>suggestions</p>);
	}
}

const mapStateToProps = state => {
	return {
		currentPageNumber: state.suggestion.currentPageNumber,
		loadedPages: state.suggestion.loadedPages,
		totalPages: state.suggestion.totalPages,
		currentPage: state.suggestion.pages.find(page => page.number === state.suggestion.currentPageNumber)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadFirstPage: () => { dispatch(suggestionsActions.loadFirstPage()) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Suggestions);