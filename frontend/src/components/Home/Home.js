// import logo from '../../imgs/logo.jpg'
// import NavBar from '../Navbar/navbar.js'
import "./Home.css";
import ChannelFormPage from "../Modal/modal";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChannelItem from "../Channels/channelItem";
import { fetchChannels, fetchChannel } from "../../store/channels";
import ChatHeader from "../chatHeader/chatHeader.js";
import HeaderModal from "../chatHeader/headerModal";
import Room from "../Room.js";
import logo from "../../imgs/logo_copy.png";
import DMRoom from "../DMRoom";
import consumer from "../../consumer";
import da from "../../imgs/down_arrow.png";
import DMChannelItem from "../Channels/DMchannelItem";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUsers, receiveUser } from "../../store/users";
import { reload, updateColorMode } from "../../store/session";

function Home() {
  const dispatch = useDispatch();
  const routeName = window.location.pathname.split("/")[1];
  const { id } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const channels = useSelector((state) => Object.values(state.channels));

  const [hidden, setHidden] = useState(true);
  const [showUser, setShowUser] = useState({});
  const [user_hidden, setuserHidden] = useState(true);
  const [formHidden, setFormHidden] = useState(true);
  const [showChannels, setShowChannels] = useState(true);
  const [showDMChannels, setShowDMChannels] = useState(true);

  const dm_channels = sessionUser.directMessageChannels
    ? Object.values(sessionUser?.directMessageChannels)
    : [];

  const curr_channel =
    routeName === "channels"
      ? channels.find((channel) => channel.id === parseInt(id))
      : null;

  const curr_dm_channel =
    routeName === "channels"
      ? null
      : dm_channels.find((dm_channel) => dm_channel.id === parseInt(id));

  const handleModal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setFormHidden(!formHidden);
  };
  
  const handleColor = () => {
    dispatch(updateColorMode(sessionUser));
  };

  const handleUserModal = (e) => {
    setuserHidden(!user_hidden);
  };

  useEffect(() => {
    dispatch(fetchChannels());
    dispatch(fetchUsers());
    dispatch(receiveUser(sessionUser));
  }, [dispatch, sessionUser]);

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: "KcalsChannel" },
      {
        received: ({ type, payload }) => {
          switch (type) {
            case "RECEIVE_CHANNEL":
              dispatch(fetchChannel(payload.id));
              break;
            case "RECEIVE_DM_CHANNEL":
              dispatch(reload());
              break;
            case "RECEIVE_USER":
              dispatch(reload());
              break;
            default:
              console.log("Unhandled broadcast: ", type);
              break;
          }
        },
      }
    );

    return () => subscription?.unsubscribe();
  }, [id, dispatch]);

  const channelIndexItems = showChannels ? (
    channels?.map((channel) => (
      <ChannelItem
        key={channel.id}
        channel={channel}
        selected={routeName === "channels" ? parseInt(id) : null}
      />
    ))
  ) : routeName === "channels" ? (
    <ChannelItem
      key={curr_channel?.id}
      channel={curr_channel}
      selected={parseInt(id)}
    />
  ) : null;

  const DMchannelIndexItems = showDMChannels ? (
    dm_channels?.map((dm_channel) => (
      <DMChannelItem
        key={dm_channel.id}
        dm_channel={dm_channel}
        selected={routeName !== "channels" ? parseInt(id) : null}
      />
    ))
  ) : routeName !== "channels" ? (
    <DMChannelItem
      key={curr_dm_channel.id}
      dm_channel={curr_dm_channel}
      selected={parseInt(id)}
    />
  ) : null;
  
  const displayRoom =
    routeName === "channels" ? (
      <Room
        className="room"
        hidden={hidden}
        setHidden={setHidden}
        showUser={showUser}
        setShowUser={setShowUser}
      />
    ) : (
      <DMRoom
        className="room"
        hidden={hidden}
        setHidden={setHidden}
        showUser={showUser}
        setShowUser={setShowUser}
      />
    );
    
  const userInfo = user_hidden ? null : (
    <HeaderModal handleUserModal={handleUserModal} />
  );

  const form = formHidden ? null : (
    <ChannelFormPage setHidden={setFormHidden} />
  );

  return (
    <main id="main">
      <ChatHeader
        handleUserModal={handleUserModal}
        setHidden={setHidden}
        setShowUser={setShowUser}
      />
      <div className={`channels ${sessionUser.darkMode ? "dark-purple" : ""}`}>
        <div className="logo-div">
          <img src={logo} alt="" id="logo" />
          <h1 className="kcals"> Kcals </h1>
        </div>
        <ul id="channels-bar">
          <div
            className="channel-hover"
            onClick={() => {
              setShowChannels(!showChannels);
            }}
          >
            <div className="channel-name channel-toggle">
              {" "}
              <img
                alt="arrow"
                className={showChannels ? "arrow" : "arrow rotate"}
                src={da}
              />
              Channels
            </div>
            <span className="plus hidden" onClick={handleModal}>
              {" "}
              +{" "}
            </span>
          </div>
          {channelIndexItems}
          <div
            className="channel-hover"
            onClick={() => {
              setShowDMChannels(!showDMChannels);
            }}
          >
            <div className="channel-name channel-toggle">
              {" "}
              <img
                alt="arrow"
                className={showDMChannels ? "arrow" : "arrow rotate"}
                src={da}
              />
              Direct Messages
            </div>
          </div>
          {DMchannelIndexItems}
        </ul>
        
        <div className="switch">
            <h2>
              <strong>Lights</strong>
            </h2>
            <label className="theme-switch">
              <input
                type="checkbox"
                id="checkbox"
                defaultChecked={sessionUser.darkMode}
                onClick={handleColor}
              />
              <div className="slider round"></div>
            </label>
        </div>
      </div>
      {displayRoom}
      {form}
      {userInfo}
    </main>
  );
}

export default Home;
