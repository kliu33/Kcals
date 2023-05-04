import React from 'react';
import './channelItem.css'
import RightClickMenu from './rightClickMenu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ChannelItem = (props) => {
    const channel = props.channel
    
    const handleRightClick = (e) => {
        e.preventDefault()
    }
    
    return (
        <li>
            <NavLink to={`/channels/${channel.id}`}>
                <div className="channel-div channel-name" onContextMenu={handleRightClick}>
                    # {channel.name}
                </div>
            </NavLink>
        </li>
        
    )
}

export default ChannelItem