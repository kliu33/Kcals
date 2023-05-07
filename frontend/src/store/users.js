import { RECEIVE_CHANNEL } from "./channels";
import { csrfAPIFetch } from './csrf';


const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';
const RECEIVE_USERS = 'RECEIVE_USERS';

// ACTION CREATORS
export const receiveUser = user => ({
    type: RECEIVE_USER,
    payload: user
});
export const removeUser = userId => ({
    type: REMOVE_USER,
    userId // userId: userId
});



export const receiveUsers = users => {
    return {
      type: RECEIVE_USERS,
      users
    };
  };

export const fetchUsers = () => async dispatch => {
    return csrfAPIFetch('users')
    .then(response => {
        dispatch(receiveUsers(response))
    })
}
  
// REDUCER
const userReducer = ( state = {}, action ) => {
    const nextState = { ...state };
    switch(action.type) {
        case RECEIVE_CHANNEL:
            const { payload } = action
            return {...state, ...payload.users}
        case RECEIVE_USER:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case RECEIVE_USERS:
            return { ...state, ...action.users };
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        default:
            return state;
    }
};
export default userReducer