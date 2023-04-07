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
import { Redirect, useParams } from 'react-router-dom';
import Room from '../Room.js'
import DMRoom from "../DMRoom";
import da from '../../imgs/down_arrow.png'
import DMChannelItem from "../Channels/DMchannelItem";
import { fetchUsers, receiveUser } from "../../store/users";

function Home() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const routeName = window.location.pathname.split('/')[1];
    const displayRoom = routeName === 'channels' ? <Room class='room'/> : <DMRoom class='room'/>
    const sessionUser = useSelector(state => state.session.user);
    const channels = useSelector(state => Object.values(state.channels))
    const dm_channels = Object.values(sessionUser?.directMessageChannels)
    useEffect(()=> {
        dispatch(fetchChannels())
        dispatch(fetchUsers())
        dispatch(receiveUser(sessionUser))
    }, [dispatch])
    const [showChannels, setShowChannels] = useState(true)
    const [showDMChannels, setShowDMChannels] = useState(true)
    const channelIndexItems = showChannels ? channels?.map((channel) => <ChannelItem key={channel.id} channel={channel}/>) : null
    const DMchannelIndexItems = showDMChannels ? dm_channels?.map((dm_channel) => <DMChannelItem key={dm_channel.id} dm_channel={dm_channel}/>) : null
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
                        <div class="channel-hover" onClick={() => {setShowChannels(!showChannels)}}>
                            <div class="channel-name channel-toggle"> <img class={showChannels ? "arrow" : "arrow rotate"} src={da}/>Channels 
                            </div>
                            <span class="plus hidden" onClick={handleModal}> + </span>
                        </div>
                        {channelIndexItems}
                        <div class="channel-hover" onClick={() => {setShowDMChannels(!showDMChannels)}}>
                            <div class="channel-name channel-toggle"> <img class={showDMChannels ? "arrow" : "arrow rotate"} src={da}/>Direct Messages
                            </div>
                        </div>
                        {DMchannelIndexItems}
                    </ul>
                </div>
                {displayRoom}  
                {form}
                {userInfo}
        </main>
    );
  }
  
  export default Home;

  