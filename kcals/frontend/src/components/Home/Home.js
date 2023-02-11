// import logo from '../../imgs/logo.jpg'
// import NavBar from '../Navbar/navbar.js' 
import "./Home.css"
import ChannelFormPage from "../Modal/modal";
import { useState } from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelItem from '../Channels/channelItem';
import { fetchChannels } from '../../store/channels';
import ChatHeader from '../chatHeader/chatHeader.js'

function Home() {
    const dispatch = useDispatch();
    const channels = useSelector(state => Object.values(state.channels))
    useEffect(()=> {dispatch(fetchChannels())}, [dispatch])
    const [hidden, setHidden] = useState(true)
    const channelIndexItems = channels.map((channel) => <ChannelItem key={channel.id} channel={channel}/>)
    const form = hidden ? null : <ChannelFormPage setHidden={setHidden}/>
    
    const handleModal = (e) => {
        e.preventDefault();
        setHidden(!hidden)
    }

    return (
        <main id='main'>
            <ChatHeader />
            <div class='channels'>
                <ul id="channels-bar">
                    {channelIndexItems}
                    <div class="channel-name channel-div" onClick={handleModal}>
                        <span id="plus"> + </span> Add Channel
                    </div>
                </ul>
            </div>
                {form}
        </main>
    );
  }
  
  export default Home;

  