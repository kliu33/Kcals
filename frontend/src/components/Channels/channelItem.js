import React from 'react';
import './channelItem.css'
import { NavLink } from 'react-router-dom';

const ChannelItem = (props) => {
    const channel = props.channel
    return (
        <li className='channel-item'>
            <NavLink to={`/channels/${channel.id}`}>
                <div className={`channel-div channel-name ${props.selected === channel.id ? 'blue-chan' : ''}`}>
                    # {channel.name}
                </div>
            </NavLink>
        </li>
        
    )
}

export default ChannelItem