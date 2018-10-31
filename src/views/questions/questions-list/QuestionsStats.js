import React from 'react';

const QuestionsStats = (props) => {
	return (
		<nav className="level">
			<div className="level-item has-text-centered">
				<div>
			      <p className="heading">Preguntas</p>
			      <p className="title">{props.stats.total_questions}</p>
			    </div>
			</div>
			<div className="level-item has-text-centered">
				<div>
			      <p className="heading">Preguntas Fáciles</p>
			      <p className="title">{props.stats.total_easy_questions}</p>
			    </div>
			</div>
			<div className="level-item has-text-centered">
				<div>
			      <p className="heading">Preguntas Medias</p>
			      <p className="title">{props.stats.total_medium_questions}</p>
			    </div>
			</div>
			<div className="level-item has-text-centered">
				<div>
			      <p className="heading">Preguntas Difíciles</p>
			      <p className="title">{props.stats.total_hard_questions}</p>
			    </div>
			</div>
			<div className="level-item has-text-centered">
				<div>
			      <p className="heading">Preguntas Pendientes por Aprobación</p>
			      <p className="title">{props.stats.questions_waiting_approval}</p>
			    </div>
			</div>
		</nav>
		);
}

export default QuestionsStats;