import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './reset.css';
import './index.css';
import App from './App'
import configureStore from './store';
import { restoreSession } from './store/csrf';
import * as sessionActions from './store/session.js'
import * as channelActions from './store/channels.js'
import csrfFetch, {restoreCSRF} from './store/csrf.js'

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch
  window.sessionActions = sessionActions
  window.channelActions = channelActions
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const initializeApp = () => {
  ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
  );
}

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreCSRF().then(initializeApp);
} else {
  initializeApp();
}


restoreSession().then(initializeApp)