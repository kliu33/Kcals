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
import Room from '../Room.js'

function Home() {
    const dispatch = useDispatch();
    const channels = useSelector(state => Object.values(state.channels))
    useEffect(()=> {dispatch(fetchChannels())}, [dispatch])
    const sessionUser = useSelector(state => state.session.user);
    const [showChannels, setShowChannels] = useState(true)
    const channelIndexItems = showChannels ? channels.map((channel) => <ChannelItem key={channel.id} channel={channel}/>) : null

    const [hidden, setHidden] = useState(true)
    const handleModal = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setHidden(!hidden)
    }

    const [user_hidden, setuserHidden] = useState(true)
    
    const handleUserModal = (e) => {
        e.preventDefault();
        setuserHidden(!user_hidden)
    }



    const userInfo = user_hidden ? null : <HeaderModal handleUserModal={handleUserModal}/>

    const form = hidden ? null : <ChannelFormPage setHidden={setHidden}/>
    
    if (!sessionUser) return <Redirect to="/login" />;
    return (
        <main id='main'>
                <ChatHeader handleUserModal={handleUserModal}/>
                <div class='channels'>
                    <h1 class='server'> App Academy </h1>
                    <ul id="channels-bar">
                        <div class="channel-hover"  onClick={() => {setShowChannels(!showChannels)}}>
                            <div class="channel-name channel-toggle"> Channels 
                            </div>
                            <span class="plus hidden" onClick={handleModal}> + </span>
                        </div>
                        {channelIndexItems}
                    </ul>
                </div>
                <Room class='room'/>    
                {form}
                {userInfo}
        </main>
    );
  }
  
  export default Home;

  