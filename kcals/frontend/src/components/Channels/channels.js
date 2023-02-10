import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ChannelItem from './channelItem';
import { fetchChannels } from '../../store/channels';

const ChannelIndex = () => {
    const dispatch = useDispatch();
    const channels = useSelector(state => Object.values(state.channels))
    useEffect(()=> dispatch(fetchChannels()), [dispatch])

    debugger
    const channelIndexItems = channels.map((channel) => <ChannelItem key={channel.id} channel={channel}/>)
    return(
        <ul id="channels-bar">
            {channelIndexItems}
            <div class="channel-div">
                + Add Channel
            </div>
        </ul>
    )
}

export default ChannelIndex