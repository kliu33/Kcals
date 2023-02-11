import React from 'react';
import './channelItem.css'

const ChannelItem = (props) => {

    return (
        <div class="channel-div">
            <a class="channel-name"># {props.channel.name}</a>
        </div>
    )
}

export default ChannelItem