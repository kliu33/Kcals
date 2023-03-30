import React from 'react';
import './channelItem.css'
import RightClickMenu from './rightClickMenu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ChannelItem = (props) => {
    const channel = props.channel
    const[hidden, setHidden] = useState(true)
    const[posX, setposX] = useState(0)
    const[posY, setposY] = useState(0)
    const rightClickForm = hidden ? null : <RightClickMenu channel={channel} posX={posX} posY={posY} setHidden={setHidden} />
    
    const handleRightClick = (e) => {
        e.preventDefault()
        setposX(e.clientX)
        setposY(e.clientY)
        setHidden(!hidden)
    }
    
    return (
        <li>
            <NavLink to={`/channels/${channel.id}`}>
                <div class="channel-div channel-name" onContextMenu={handleRightClick}>
                    # {channel.name}
                </div>
                {rightClickForm}
            </NavLink>
        </li>
        
    )
}

export default ChannelItem