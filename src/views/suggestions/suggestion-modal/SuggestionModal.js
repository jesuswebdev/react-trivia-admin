import React from 'react';

const SuggestionModal = props => (
  <div className={`modal ${props.active && 'is-active'}`}>
    <div className="modal-background" />
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Pregunta Sugerida</p>
        <button
          className="delete"
          aria-label="close"
          onClick={() => props.closeModal()}
        />
      </header>
      <section className="modal-card-body">
        <div className="field">
          <label className="label">Cuerpo de la pregunta:</label>
          <div className="control">
            <textarea
              className="textarea"
              value={props.suggestion.title}
              readOnly
            />
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-body">
            {props.suggestion.options.map(
              (option, index) =>
                index < 2 && (
                  <div className="field" key={index}>
                    <label className="label">Opción {index + 1}:</label>
                    <div className="control">
                      <input value={option.text} className="input" readOnly />
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-body">
            {props.suggestion.options.map(
              (option, index) =>
                index >= 2 && (
                  <div className="field" key={index}>
                    <label className="label">Opción {index + 1}:</label>
                    <div className="control">
                      <input value={option.text} className="input" readOnly />
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field" style={{ maxWidth: '150px' }}>
              <label className="label">Dificultad</label>
              <div className="control">
                <input
                  className="input"
                  value={
                    props.suggestion.difficulty === 'easy'
                      ? 'Fácil'
                      : props.suggestion.difficulty === 'medium'
                        ? 'Media'
                        : 'Difícil'
                  }
                  readOnly
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Categoria</label>
              <div className="control">
                <input
                  className="input"
                  value={props.suggestion.category.title}
                  readOnly
                />
              </div>
            </div>

            <div className="field" style={{ maxWidth: '180px' }}>
              <label className="label">Opción correcta</label>
              <div className="control">
                <input
                  className="input"
                  value={
                    props.suggestion.options.find(
                      option => option.correct_answer
                    ).option_id + 1
                  }
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        {props.suggestion.link && (
          <div className="field">
            <label className="label">Enlace:</label>
            <div className="control">
              <input value={props.suggestion.link} className="input" readOnly />
            </div>
          </div>
        )}

        {props.suggestion.did_you_know && (
          <div className="field">
            <label className="label">Dato curioso:</label>
            <div className="control">
              <input
                value={props.suggestion.did_you_know}
                className="textarea"
                readOnly
              />
            </div>
          </div>
        )}
      </section>
      <footer className="modal-card-foot">
        <button
          className="button is-success"
          onClick={() => {
            console.log(props.suggestion._id, 'approve');
          }}>
          Aprobar
        </button>
        <button
          className="button is-danger"
          onClick={() => {
            props.handleButton(props.suggestion._id, 'reject', props.current);
            console.log(props.suggestion._id, 'reject', props.current);
          }}>
          Rechazar
        </button>
        <button className="button" onClick={() => props.closeModal()}>
          Cancelar
        </button>
      </footer>
    </div>
  </div>
);

export default SuggestionModal;
