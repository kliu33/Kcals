import React from 'react';
import './channelItem.css'
import RightClickMenu from './rightClickMenu';
import { useState } from 'react';

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
        <>
        <div class="channel-div" onContextMenu={handleRightClick}>
            <a href={`/channels/${channel.id}`} class="channel-name"># {channel.name}</a>
        </div>
        {rightClickForm}
        </>
    )
}

export default ChannelItem