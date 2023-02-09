import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ChannelItem from './channel';
import { getChannels, fetchChannels } from '../../store/channel';

const ChannelIndex = () => {
    const dispatch = useDispatch();

    useEffect(()=> dispatch(fetchChannels()), [])
    const channels = useSelector(getChannels)
    debugger
    const channelIndexItems = channels.map((channel) => <ChannelItem key={channel.id} channel={channel}/>)
    return(
        <ul>
            {channelIndexItems}
            <Link to={`/channel/new`}>New Channel</Link>
        </ul>
    )
}

export default ChannelIndex