import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from './session';
import channels from './channels';
import { messagesReducer } from "./messages";
import users from './users'
import dm_channels from "./dm_channels";

const rootReducer = combineReducers({
    session,
    channels,
    dm_channels,
    messages: messagesReducer,
    users
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;