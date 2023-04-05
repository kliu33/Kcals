import React from 'react';
import './channelItem.css'
import { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import RightClickMenu from './rightClickMenu';

const DMChannelItem = ({dm_channel}) => {
    const[hidden, setHidden] = useState(true)
    const rightClickForm = hidden ? null : <RightClickMenu dm_channel={dm_channel} posX={posX} posY={posY} setHidden={setHidden} />
    const[posX, setposX] = useState(0)
    const[posY, setposY] = useState(0)
    
    const handleRightClick = (e) => {
        e.preventDefault()
        setposX(e.clientX)
        setposY(e.clientY)
        setHidden(!hidden)
    }
    
    return (
        <li>
            <NavLink to={`/dm_channels/${dm_channel.id}`}>
                <div class="channel-div channel-name" onContextMenu={handleRightClick}>
                    # {dm_channel.user2_id}
                </div>
                {rightClickForm}
            </NavLink>
        </li>
    )
}

export default DMChannelItem