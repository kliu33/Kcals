import { csrfAPIFetch } from './csrf';
import { RECEIVE_CHANNEL } from './channels.js'

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
const RECEIVE_REACTION = 'RECEIVE_REACTION';
const REMOVE_REACTION = 'REMOVE_REACTION';
const UPDATE_MESSAGE = 'UPDATE_MESSAGE';

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

export const patchMessage = message => {
  return {
    type: UPDATE_MESSAGE,
    message
  }
}

export const receiveReaction = reaction => {
  return {
    type: RECEIVE_REACTION,
    reaction
  }
}

export const removeReaction = reaction => {
  return {
    type: REMOVE_REACTION,
    reaction
  }
}

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


export const createReaction = reaction => (
  csrfAPIFetch('reactions', {
    method: 'POST',
    data: { reaction }
  })
);

export const deleteReaction = reactionId => (
  csrfAPIFetch(`reactions/${reactionId}`, {
    method: 'DELETE'
  })
)

export const updateMessage = (message) => async (dispatch) => {
  const response = await fetch(`/api/messages/${message.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(message),
  });
  if(response.ok) {
    const messageContent = await response.json();
    dispatch(receiveMessage(messageContent));
  }
};

export const getDMMessages = dmChannelId => state => {
  return state.session && state.session.user.directMessageChannels && state.session.user.directMessageChannels[dmChannelId]
    ? Object.values(state.session.user.directMessageChannels[dmChannelId].messages)
        .map(message => ({
          ...message,
          user: state.users[message.userId]?.first_name
        }))
        .sort(({ createdAt: timeA }, { createdAt: timeB }) => Math.sign(
          new Date(timeA).getTime() - new Date(timeB).getTime()
        ))
    : [];
}

export const createMessage = message => (
  csrfAPIFetch('messages', {
    method: 'POST',
    data: { message }
  })
);

export const destroyMessage = id => (
  csrfAPIFetch(`messages/${id}`, {
    method: 'DELETE'
  })
);

export const messagesReducer = (state = {}, action) => {
  const newState = {...state}
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
      delete newState[action.messageId];
      return newState;
    case UPDATE_MESSAGE:
      const updatedMessage = action.message;
      return { ...state, [updatedMessage.id]: updatedMessage };
    case RECEIVE_REACTION:
      if (!newState[action.reaction.message_id].reactions.find(react => react.emoji === action.reaction.emoji)){
        newState[action.reaction.message_id].reactions.push(action.reaction)
      }
      return newState
    case REMOVE_REACTION:
      const messageId = action.reaction.message_id;
      const react_message = newState[action.reaction.message_id];
      const updatedReactions = react_message.reactions.filter(reac => reac.id !== action.reaction.id);
      react_message.reactions = updatedReactions;
      return { ...state, [messageId]: react_message };
    default:
      return state;
  }
};
