import { reload } from "./session";
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
  const response = await fetch(`/api/dm_channels`)
  if (response.ok) {
      const data = await response.json();
      dispatch(receiveDMChannels(data))
  }
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
      const data = await response.json();
      dispatch(reload());
      return { response, dmChannel: data.dmChannel };
    }
}

const DMchannelsReducer = (state = {}, action) => {
    switch (action.type) {
      // case RECEIVE_DM_CHANNEL:
      //   const { payload } = action;
      //   return { ...state, [payload.dmChannel.id]: payload.dmChannel };
      // case RECEIVE_DM_CHANNELS:
      //   return { ...state, ...action.dmChannels };
    //   case REMOVE_CHANNEL:
    //     const newState = { ...state };
    //     delete newState[action.channelId];
    //     return newState;
      default:
        return state;
    }
  };

export default DMchannelsReducer;