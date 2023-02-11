import React from 'react';
import './channelItem.css'

const ChannelItem = (props) => {

    return (
        <div class="channel-div">
            <span class="channel-name"># {props.channel.name}</span>
        </div>
    )
}

export default ChannelItem