import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as questionActions from '../../../state/question/actions';
import Paginator from '../../../components/paginator/Paginator';
import Aux from '../../../components/aux/Aux';
import QuestionsStats from './QuestionsStats';

class QuestionsList extends Component {

	componentDidMount() {
		if (!this.props.loadedPages.includes(1)) {
			this.props.loadFirstPage();
		}
		if (!this.props.questionsStats) {
			this.props.loadStats();
		}
	}

	nextPageHandler = (nextPageNumber) => {
		if (!this.props.loadedPages.includes(nextPageNumber)) {
			this.props.loadPage(nextPageNumber);
		}
		else {
			this.props.nextPage(nextPageNumber);
		}
	}

	render() {
		console.log(this.props)
		return (
			<Aux>
				{
					this.props.loadingStats ?
					<p className="has-text-centered">Cargando estadísticas...</p> :
					this.props.questionsStats && <QuestionsStats stats={this.props.questionsStats} />
				}
				<div className="level">
					<div className="level-item has-text-centered">
						<Link to="/questions/new" className="button is-info">Crear Pregunta</Link>
					</div>
					{
						(this.props.questionsStats || {}).questions_waiting_approval > 0 && (
						<div className="level-item has-text-centered">
							<Link to="/suggestions" className="button is-info">Ver sugerencias</Link>
						</div>)
					}
				</div>
				{
					this.props.loadingFirstPage ?
					<p className="has-text-centered">Cargando preguntas...</p> :
					<Aux>
						<Paginator 
						current={this.props.currentPageNumber}
						total={this.props.totalPages}
						onClickNextPage={this.nextPageHandler} />
						<div className="columns is-mobile is-tablet is-desktop is-multiline is-centered" style={{marginTop: '1px', minHeight: '85vh'}}>
							{ this.props.loadingNextPage && <p className="has-text-centered" style={{marginTop: '25px', minHeight: '100vh'}}>Cargando preguntas...</p> }
							{
								this.props.currentPage && !this.props.loadingNextPage && this.props.currentPage.questions.map(question => {
									let tagClass;
									let questionDifficulty;
									if (question.difficulty === 'easy') {
										tagClass = 'is-success';
										questionDifficulty = 'Fácil';
									}
									if (question.difficulty === 'medium') {
										tagClass = 'is-warning';
										questionDifficulty = 'Media';
									}
									if (question.difficulty === 'hard') {
										tagClass = 'is-danger';
										questionDifficulty = 'Difícil';
									}

									return (
										<div key={question._id} className="column is-10-mobile is-4-tablet is-3-desktop">
											<div className="card">
												<header className="card-header">
													<div className="card-header-title">
														<div className="tags">
															<span className="tag is-info">{question.category.title}</span>
															<span className={['tag', tagClass].join(' ')}>{questionDifficulty}</span>
														</div>
													</div>
												</header>
												<div className="card-content">
													<div className="content">
														<p>{question.title}</p>
														<ul>
															{question.options.map((option, index) => {
																return <li key={index}>{option.text}</li>
															})}
														</ul>
													</div>
												</div>
												<footer className="card-footer">
													<Link className="card-footer-item" to={"/questions/" + question._id}>Ver</Link>
													<Link className="card-footer-item" to={"/questions/" + question._id + "/edit"}>Editar</Link>
													<a className="card-footer-item">Eliminar</a>
												</footer>
											</div>
										</div>
										);
								})
							}
						</div>
						<Paginator 
						current={this.props.currentPageNumber}
						total={this.props.totalPages}
						onClickNextPage={this.nextPageHandler} />
					</Aux>
				}	
			</Aux>
			);
	}
}

const mapStateToProps = state => {
	return {
		currentPage: state.question.currentPage,
		currentPageNumber: state.question.currentPageNumber,
		totalPages: state.question.totalPages,
		loadedPages: state.question.loadedPages,
		loadingFirstPage: state.ui.questionList.loading,
		loadingNextPage: state.ui.questionList.loadingNextQuestions,
		questionsStats: state.question.stats,
		loadingStats: state.ui.questionList.loadingStats,
		errorStats: state.ui.questionList.errorStats,
		errorMessageStats: state.ui.questionList.errorMessageStats
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadFirstPage: () => { dispatch(questionActions.loadFirstPage()) },
		loadPage: (pageNumber) => { dispatch(questionActions.loadPage(pageNumber)) },
		nextPage: (pageNumber) => { dispatch(questionActions.nextPage(pageNumber)) },
		loadStats: () => { dispatch(questionActions.loadStats()); }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);