import { receiveUsers } from './users';
import { csrfAPIFetch } from './csrf';

export const RECEIVE_CHANNELS = 'session/receiveChannels'
export const RECEIVE_CHANNEL = 'session/receiveChannel';
export const REMOVE_CHANNEL = 'session/removeChannel';
// const EDIT_CHANNEL = 'session/editChannel';

const receiveChannels = channels => ({
    type: RECEIVE_CHANNELS,
    channels
  });

const receiveChannel = payload => ({
    type: RECEIVE_CHANNEL,
    payload
})

const removeChannel = channelId => ({
        type: REMOVE_CHANNEL,
        channelId
    });


export const getChannel = (channelId) => (state) => state.channels ? state.channels[channelId] : null

export const getChannels = (state) => state.channels ? Object.values(state.channels) : []

export const fetchChannel = (channelId) => async dispatch => {
    const response = await fetch(`/api/channels/${channelId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveChannel(data))
    }
}

export const fetchChannels = () => async dispatch => {
    return csrfAPIFetch('channels').then(({ channels, users }) => {
      dispatch(receiveChannels(channels));
      dispatch(receiveUsers(users));
    });
}

export const deleteChannel = (channelId) => async dispatch => {
    const response = await fetch (`/api/channels/${channelId}`, {
        method: "DELETE"
    })
    if(response.ok) {
        dispatch(removeChannel(channelId))
    }
}

export const createChannel = (channel) => async dispatch => {
    const response = await fetch (`/api/channels`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(channel)
    })
    if (response.ok) {
        const channel = await response.json();
        dispatch(receiveChannel(channel))
    }
}

export const updateChannel = (channel) => async dispatch => {
    const response = await fetch(`/api/channels/${channel.id}`, {
        method: "PATCH",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(channel)
    })
    if (response.ok) {
        const channel = await response.json();
        dispatch(receiveChannel(channel))
    }
}

const channelsReducer = (state = {}, action) => {
    switch (action.type) {
      case RECEIVE_CHANNEL:
        const { payload } = action;
        return { ...state, [payload.channel.id]: payload.channel };
      case RECEIVE_CHANNELS:
        return { ...state, ...action.channels };
      case REMOVE_CHANNEL:
        const newState = { ...state };
        delete newState[action.channelId];
        return newState;
      default:
        return state;
    }
  };

export default channelsReducer;