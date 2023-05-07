import { csrfAPIFetch } from './csrf';
import { csrfFetch } from './csrf'

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';
const RECEIVE_DM_MESSAGE = 'RECEIVE_DM_MESSAGE';
const REMOVE_DM_MESSAGE = 'REMOVE_DM_MESSAGE';
const RECEIVE_DM_REACTION = 'RECEIVE_DM_REACTION';
const REMOVE_DM_REACTION = 'REMOVE_DM_REACTION';
const UPDATE_DM_MESSAGE = 'UPDATE_DM_MESSAGE';


export const receiveDMMessage = message => {
  return {
    type: RECEIVE_DM_MESSAGE,
    message
  }
}

export const patchDMMessage = message => {
  return {
    type: UPDATE_DM_MESSAGE,
    message
  }
}

export const removeDMMessage = message => {
  return {
    type: REMOVE_DM_MESSAGE,
    message
  }
}

export const receiveDMReaction = reaction => {
  return {
    type: RECEIVE_DM_REACTION,
    reaction
  }
}

export const removeDMReaction = reaction => {
  return {
    type: REMOVE_DM_REACTION,
    reaction
  }
}

const storeCSRFToken = response => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};


export const updateColorMode = (userId) => async dispatch => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "PATCH",
  })
  if (response.ok) { 
    dispatch(reload())
  }
};

export const reload = () => async dispatch => {
  const response = await csrfFetch("/api/session")
  const data = await response.json();
  storeCurrentUser(data.user)
  dispatch(setCurrentUser(data.user));
}

export const login = ({ email, password }) => async dispatch => {
  const response = await csrfFetch("api/session", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const logout = () => async dispatch => {
    storeCurrentUser(null)
    dispatch(removeCurrentUser)
    const response = await csrfFetch("/api/session", {
        method: "DELETE",
    })
    return response;
}

export const restoreSession = () => async dispatch => {
  const response = await csrfAPIFetch("session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
    const { email, first_name, last_name, password } = user;
    const response = await csrfFetch("api/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        first_name,
        last_name,
        password
      })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  };


const initialState = { 
  user: JSON.parse(sessionStorage.getItem("currentUser"))
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    case RECEIVE_DM_MESSAGE:
      state.user.directMessageChannels[parseInt(action.message.direct_message_channel_id)].messages.push(action.message)
      return { ...state}
    case REMOVE_DM_MESSAGE:
      const dm_id = action.message.id;
      const dm_channel_messages = state.user.directMessageChannels[action.message.direct_message_channel_id].messages
      const updated_dm_channel_messages = dm_channel_messages.filter(message => message.id !== dm_id)
      state.user.directMessageChannels[action.message.direct_message_channel_id].messages = updated_dm_channel_messages
      return {...state}
    case UPDATE_DM_MESSAGE:
      const dm_id2 = action.message.id;
      const dm_channel_messages2 = state.user.directMessageChannels[action.message.directMessageChannelId].messages
      const idx = dm_channel_messages2.findIndex(message => message.id === dm_id2)
      state.user.directMessageChannels[action.message.directMessageChannelId].messages[idx] = action.message
      return {...state}
      break;
    case RECEIVE_DM_REACTION:
      const dm_channel_id = Object.values(state.user.directMessageChannels).find(channel => channel.messages.some(message => message.id === action.reaction.message_id)).id
      state.user.directMessageChannels[dm_channel_id].messages.find(message => message.id === action.reaction.message_id).reactions.push(action.reaction)
      return {...state}
    case REMOVE_DM_REACTION:
      const dm_channel_id2 = Object.values(state.user.directMessageChannels).find(channel => channel.messages.some(message => message.id === action.reaction.message_id)).id
      const react_message = state.user.directMessageChannels[dm_channel_id2].messages.find(message => message.id === action.reaction.message_id)
      const updatedReactions = react_message.reactions.filter(reac => reac.id !== action.reaction.id)
      react_message.reactions = updatedReactions
      return {...state}
    default:
      return {...state};
  }
};



export default sessionReducer;