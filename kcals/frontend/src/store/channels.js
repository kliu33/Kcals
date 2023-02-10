export const RECEIVE_CHANNELS = 'session/receiveChannels'
export const RECEIVE_CHANNEL = 'session/receiveChannel';
export const REMOVE_CHANNEL = 'session/removeChannel';
// const EDIT_CHANNEL = 'session/editChannel';

const receiveChannels = channels => ({
    type: RECEIVE_CHANNELS,
    channels
  });

const receiveChannel = channel => ({
    type: RECEIVE_CHANNEL,
    channel
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
        const channel = await response.json();
        dispatch(receiveChannel(channel))
    }
}

export const fetchChannels = () => async dispatch => {
    const response = await fetch(`/api/channels`)
    if (response.ok) {
        const channels = await response.json();
        dispatch(receiveChannels(channels))
    }
}

export const deleteChannel = (channelId) => async dispatch => {
    const response = await fetch (`/api/channels/${channelId}`, {
        method: "DELETE"
    })
    if(response.ok) {
        dispatch(removeChannel(channelId))
    }
}

const channelsReducer = (state={}, actions) => {
    const newState = {...state}
    switch(actions.type) {
        case RECEIVE_CHANNELS:
            return {...state, ...actions.channels}
        case RECEIVE_CHANNEL:
            newState[actions.channel.id] = actions.channel
            return newState
        case REMOVE_CHANNEL:
            delete newState[actions.channelsId]
            return newState
        default:
            return state
    }
}


export default channelsReducer;