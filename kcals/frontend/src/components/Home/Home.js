// import logo from '../../imgs/logo.jpg'
// import NavBar from '../Navbar/navbar.js' 
import "./Home.css"
import ChannelFormPage from "../Modal/modal";
import { useState } from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChannelItem from '../Channels/channelItem';
import { fetchChannels } from '../../store/channels';
import ChatHeader from '../chatHeader/chatHeader.js';
import HeaderModal from "../chatHeader/headerModal";
import { Redirect } from 'react-router-dom';

function Home() {
    const dispatch = useDispatch();
    const channels = useSelector(state => Object.values(state.channels))
    useEffect(()=> {dispatch(fetchChannels())}, [dispatch])
    const sessionUser = useSelector(state => state.session.user);
    const channelIndexItems = channels.map((channel) => <ChannelItem key={channel.id} channel={channel}/>)

    const [hidden, setHidden] = useState(true)
    const form = hidden ? null : <ChannelFormPage setHidden={setHidden}/>
    const handleModal = (e) => {
        e.preventDefault();
        setHidden(!hidden)
    }

    const [user_hidden, setuserHidden] = useState(true)
    const handleUserModal = (e) => {
        e.preventDefault();
        setuserHidden(!user_hidden)
    }


    const userInfo = user_hidden ? null : <HeaderModal handleUserModal={handleUserModal}/>

    
    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <main id='main'>
            <ChatHeader handleUserModal={handleUserModal}/>
            <div class='channels'>
                <ul id="channels-bar">
                    {channelIndexItems}
                    <div class="channel-name channel-div" onClick={handleModal}>
                        <span id="plus"> + </span> Add Channel
                    </div>
                </ul>
            </div>
            {form}
            {userInfo}
        </main>
    );
  }
  
  export default Home;

  