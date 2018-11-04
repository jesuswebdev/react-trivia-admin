import React, { Fragment } from 'react';
import Paginator from '../../../components/paginator/Paginator';

const SuggestionsList = props => {
  return (
    <Fragment>
      <Paginator
        current={props.currentPage}
        total={props.totalPages}
        onClickNextPage={props.onClickNextPage}
      />
      {props.loading ? (
        <p>Cargando sugerencias...</p>
      ) : (
        <div
          style={{ marginTop: '1px' }}
          className="columns is-mobile is-tablet is-desktop is-multiline is-centered">
          {props.suggestions.map(suggestion => {
            let tagClass;
            let suggestionDifficulty;
            if (suggestion.difficulty === 'easy') {
              tagClass = 'is-success';
              suggestionDifficulty = 'Fácil';
            }
            if (suggestion.difficulty === 'medium') {
              tagClass = 'is-warning';
              suggestionDifficulty = 'Media';
            }
            if (suggestion.difficulty === 'hard') {
              tagClass = 'is-danger';
              suggestionDifficulty = 'Difícil';
            }
            return (
              <div
                key={suggestion._id}
                className="column is-10-mobile is-4-tablet is-3-desktop">
                <div className="card">
                  <header className="card-header">
                    <div className="card-header-title">
                      <div className="tags">
                        <span className="tag is-info">
                          {suggestion.category.title}
                        </span>
                        <span className={['tag', tagClass].join(' ')}>
                          {suggestionDifficulty}
                        </span>
                      </div>
                    </div>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      <p>{suggestion.title}</p>
                      <ul>
                        {suggestion.options.map((option, index) => {
                          return <li key={index}>{option.text}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                  <footer className="card-footer">
                    <a
                      className="card-footer-item"
                      onClick={() => props.openModal(suggestion._id)}>
                      Ver
                    </a>
                  </footer>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Paginator
        current={props.currentPage}
        total={props.totalPages}
        onClickNextPage={props.onClickNextPage}
      />
    </Fragment>
  );
};

export default SuggestionsList;
