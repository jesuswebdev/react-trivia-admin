import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as questionActions from '../../../state/question/actions';

class QuestionInfo extends Component {

	componentDidMount() {
		if(!this.props.question) {
			this.props.loadQuestion(this.props.match.params.id);
		}
	}

	render() {
		console.log(this.props);
		if(this.props.loading) {
			return <p className="has-text-centered">Cargando información...</p>
		}
		let question = this.props.question || this.props.questionInfo;
		return (question && (
			<div className="box">
				<nav className="level">
					<div className="level-item has-text-centered">
						<div>
					      <p className="heading">Veces Respondida</p>
					      <p className="title">{question.times_answered}</p>
					    </div>
					</div>
					<div className="level-item has-text-centered">
						<div>
					      <p className="heading">Veces Respondida Correctamente</p>
					      <p className="title">{question.times_answered_correctly}</p>
					    </div>
					</div>
					<div className="level-item has-text-centered">
						<div>
					      <p className="heading">Categoría</p>
					      <p className="title">{question.category.title}</p>
					    </div>
					</div>
					<div className="level-item has-text-centered">
						<div>
					      <p className="heading">Dificultad</p>
					      <p className="title">{question.difficulty}</p>
					    </div>
					</div>
				</nav>

				<p className="has-text-centered">{question.title}</p>
				<ul>
					{question.options.map(option => {
						return <li key={option.option_id}>{option.text}</li>
					})}
				</ul>
				<p>creada el: {question.createdAt} - por: {question.added_by}</p>
				{ question.tags.length > 0 && <p>Etiquetas: {question.tags.join(', ')}</p>}
				{ question.link && <p>Enlace: <a href={question.link}>Click aquí</a></p>}
				{ question.did_you_know && <p>Sabías que: {question.did_you_know}</p>}
			</div>
			)
		);
	}
};

const mapStateToProps = (state, {match: {params}}) => {
	return {
		question: ((state.question.currentPage || {}).questions || []).find(q => q._id === params.id),
		questionInfo: state.question.questionInfo,
		loading: state.ui.questionInfo.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		loadQuestion: (questionId) => { dispatch(questionActions.loadQuestionInfo(questionId)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionInfo);