import React from 'react';
import './channelItem.css'
import { useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import RightClickMenu from './rightClickMenu';
import { useSelector } from 'react-redux';


const DMChannelItem = ({dm_channel}) => {
    const sessionUser = useSelector(state => state.session.user);
    const recipient = dm_channel.user1.id === sessionUser.id ? dm_channel.user2 : dm_channel.user1
    // const[hidden, setHidden] = useState(true)
    // const rightClickForm = hidden ? null : <RightClickMenu dm_channel={dm_channel} posX={posX} posY={posY} setHidden={setHidden} />
    // const[posX, setposX] = useState(0)
    // const[posY, setposY] = useState(0)
    
    // const handleRightClick = (e) => {
    //     e.preventDefault()
    //     setposX(e.clientX)
    //     setposY(e.clientY)
    //     setHidden(!hidden)
    // }
    
    return (
        <li>
            <NavLink to={`/dm_channels/${dm_channel.id}`}>
                <div className="channel-div channel-name">
                    {recipient.firstName} {recipient.lastName}
                </div>
                {/* {rightClickForm} */}
            </NavLink>
        </li>
    )
}

export default DMChannelItem