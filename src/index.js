import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './state/reducers';
import App from './App';
import { getAuthState } from './utils';

const store = createStore(rootReducer, getAuthState(), applyMiddleware(thunk));
const Application = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Application, document.getElementById('root'));
