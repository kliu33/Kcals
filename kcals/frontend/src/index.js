import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Login from './components/Login/Login'
import configureStore from './store';
import { restoreSession } from './store/csrf';
import * as sessionActions from './store/session.js'
import csrfFetch from './store/csrf.js'

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch
  window.sessionActions = sessionActions
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

const initializeApp = () => {
  ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
            <Login />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
  );
}



restoreSession().then(initializeApp)