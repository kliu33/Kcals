import csrfApiFetch from './csrf';
import { RECEIVE_CHANNEL } from './channels.js'

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const receiveMessage = message => {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
};

export const receiveMessages = messages => {
  return {
    type: RECEIVE_MESSAGES,
    messages
  };
};

export const removeMessage = messageId => {
  return {
    type: REMOVE_MESSAGE,
    messageId
  };
};

export const getMessages = channelId => state => {
  return Object.values(state.messages)
               .filter(message => message.channelId === parseInt(channelId))
               .map(message => ({
                 ...message,
                 user: state.users[message.userId]?.first_name
               }))
               .sort(({ createdAt: timeA }, { createdAt: timeB }) => Math.sign(
                 new Date(timeA).getTime() - new Date(timeB).getTime()
               ));
};

export const createMessage = message => (
  csrfApiFetch('messages', {
    method: 'POST',
    data: { message }
  })
);

export const destroyMessage = id => (
  csrfApiFetch(`messages/${id}`, {
    method: 'DELETE'
  })
);

export const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CHANNEL:
      const { payload } = action
      return { ...state, ...payload.messages}
    case RECEIVE_MESSAGE:
      const { message } = action;
      return { ...state, [message.id]: message };
    case RECEIVE_MESSAGES:
      return { ...state, ...action.messages };
    case REMOVE_MESSAGE:
      const newState = { ...state };
      delete newState[action.messageId];
      return newState;
    default:
      return state;
  }
};
