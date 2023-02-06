const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';
// ACTION CREATORS
export const receiveUser = user => ({
    type: RECEIVE_USER,
    payload: user
});
export const removeUser = userId => ({
    type: REMOVE_USER,
    userId // userId: userId
});
// REDUCER
const userReducer = ( state = {}, action ) => {
    const nextState = { ...state };
    switch(action.type) {
        case RECEIVE_USER:
            debugger
            nextState[action.payload.id] = action.payload;
            return nextState;
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        default:
            return state;
    }
};
export default userReducer