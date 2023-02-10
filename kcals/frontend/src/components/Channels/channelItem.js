import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../store/channels';
import './channelItem.css'

const ChannelItem = (props) => {
    const dispatch = useDispatch()

    return (
        <div class="channel-div">
            <a class="channel-name"># {props.channel.name}</a>
        </div>
    )
}

export default ChannelItem