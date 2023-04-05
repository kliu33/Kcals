import { csrfAPIFetch } from './csrf';

export const RECEIVE_DM_CHANNELS = 'session/receiveDMChannels'
export const RECEIVE_DM_CHANNEL = 'session/receiveDMChannel';

const receiveDMChannels = dm_channels => ({
    type: RECEIVE_DM_CHANNELS,
    dm_channels
  });

const receiveDMChannel = payload => ({
    type: RECEIVE_DM_CHANNEL,
    payload
})


export const fetchDMChannel = (DM_channelId) => async dispatch => {
    const response = await fetch(`/api/dm_channels/${DM_channelId}`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveDMChannel(data))
    }
}

export const fetchDMChannels = () => async dispatch => {
    return csrfAPIFetch('dm_channels').then(({ dm_channels }) => {
      dispatch(receiveDMChannels(dm_channels));
    });
}


export const createDMChannel = (dm_channel) => async dispatch => {
    const response = await fetch (`/api/dm_channels`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dm_channel)
    })
    if (response.ok) {
        const dm_channel = await response.json();
        dispatch(receiveDMChannel(dm_channel))
    }
}

const DMchannelsReducer = (state = {}, action) => {
    switch (action.type) {
      case RECEIVE_DM_CHANNEL:
        const { payload } = action;
        return { ...state, [payload.dm_channel.id]: payload.dm_channel };
      case RECEIVE_DM_CHANNELS:
        return { ...state, ...action.dm_channels };
    //   case REMOVE_CHANNEL:
    //     const newState = { ...state };
    //     delete newState[action.channelId];
    //     return newState;
      default:
        return state;
    }
  };

export default DMchannelsReducer;