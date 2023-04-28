import { csrfAPIFetch } from './csrf';
import { csrfFetch } from './csrf'

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';
const RECEIVE_DM_MESSAGE = 'RECEIVE_DM_MESSAGE';


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

export const reload = () => async dispatch => {
  console.log('hello')
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


  export const receiveDMMessage = message => {
    return {
      type: RECEIVE_DM_MESSAGE,
      message
    }
  }

// export const receiveDMMessages = dmChannelId => {

// }
  

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
    default:
      return {...state};
  }
};



export default sessionReducer;