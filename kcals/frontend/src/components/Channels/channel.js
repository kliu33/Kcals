import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../store/channel';

const ChannelItem = (props) => {
    const dispatch = useDispatch()


    const handleClick = (e) => {
        dispatch(deleteChannel(props.channel.id))
    }

    return (
        <li>
            <Link to={`/channels/${props.channel.id}`}>CHANNEL</Link>
            <Link to={`/channels/${props.channel.id}/edit`}>Edit</Link>
            <button onClick={handleClick}>Delete channel</button>
        </li>
    )
}

export default ChannelItem