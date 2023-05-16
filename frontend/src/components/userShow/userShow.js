import "./userShow.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createDMChannel } from "../../store/dm_channels";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import email from "../../imgs/email.png"

function UserShowModal(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [redirectTo, setRedirectTo] = useState(null);
  const status_pics = {
    "In a meeting": '📅',
    "Commuting": '🚈',
    "A04 Flu": '🤒',
    "Vacationing": '🌴',
    "Working remotely": '🏠'
  }

  const handleUserShow = (e) => {
    e.preventDefault();
    props.setHidden(true);
  };

  const handleDm = (e) => {
    e.preventDefault();

    let find_dm = sessionUser.directMessageChannels
      ? Object.values(sessionUser.directMessageChannels).find(
          (channel) =>
            channel.user1.id === sessionUser.id &&
            channel.user2.id === props.showUser.id
        )
      : null;
    let find_dm2 = sessionUser.directMessageChannels
      ? Object.values(sessionUser.directMessageChannels).find(
          (channel) =>
            channel.user2.id === sessionUser.id &&
            channel.user1.id === props.showUser.id
        )
      : null;
    if (find_dm) {
      setRedirectTo(find_dm.id);
    } else if (find_dm2) {
      setRedirectTo(find_dm2.id);
    } else {
      let new_dm = {
        user1_id: sessionUser.id,
        user2_id: props.showUser.id,
      };
      let new_chan = dispatch(createDMChannel(new_dm));
      new_chan.then((response) => {
        let dmChannel = response.dmChannel;
        setRedirectTo(dmChannel.id);
      });
    }
  };

  if (redirectTo) return <Redirect to={`/dm_channels/${redirectTo}`} />;
  
  const img = props.showUser?.photoUrl
    ? props.showUser.photoUrl
    : "https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67";

  return (
    <div className="userInfo">
      <h2 className="show-head">
        {" "}
        Profile
        <p className="close-user-modal" onClick={handleUserShow}>
          x
        </p>
      </h2>
      <div className="img-div">
        <img id="pfp6" src={img} alt=""></img>
      </div>
      <h1 id="show-name">
        {props.showUser?.firstName} {props.showUser?.lastName}
      </h1>
            {!props.showUser?.status ? null : (status_pics[props.showUser?.status] ? 
      <span id='user-status-show' title={props.showUser?.status}> {status_pics[props.showUser?.status]} </span> : <span id='user-status-show' title={props.showUser?.status}>💬</span>)} {props.showUser?.status}
      <button
        className={`message-button ${
          sessionUser.darkMode ? "message-button-dark" : ""
        }`}
        onClick={handleDm}
      >
        💬 Send Message{" "}
      </button>
      <h2 id='contact'> Contact Information: </h2>
      <div id='email-container'>
        <img src={email} id='email-logo' alt='email'/>
        <div id='email'>
          <h2>Email Address:</h2>
          <p> {props.showUser?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserShowModal;
