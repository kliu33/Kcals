import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getDMMessages,
  createMessage,
  destroyMessage,
  updateMessage,
} from "../store/messages.js";
import {
  receiveDMMessage,
  removeDMMessage,
  removeDMReaction,
  receiveDMReaction,
  patchDMMessage,
  fetchDMChannel
} from "../store/session.js";
import Message from "./Message";
import consumer from "../consumer.js";
import "./Room.css";
import react from "../imgs/react.png";
import trash from "../imgs/trash.png";
import edit from "../imgs/edit.png";
import options from "../imgs/options.png";
import Emoji from "./Emoji/Emoji.js";
import EmojiList from "./Emoji/EmojiList.js";
import UserShowModal from "./userShow/userShow.js";

function DMRoom({ hidden, setHidden, showUser, setShowUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const sessionUser = useSelector((state) => state.session.user);
  const messages = useSelector(getDMMessages(parseInt(id)));
  const currentUserId = useSelector((state) => state.session.user.id);
  const dm_channel = useSelector(
    (state) =>
      state.session.user &&
      state.session.user.directMessageChannels &&
      state.session.user.directMessageChannels[id]
  );

  const recipient = dm_channel
    ? dm_channel.user1.id === sessionUser.id
      ? dm_channel.user2
      : dm_channel.user1
    : null;

  const [edittingId, setEdittingId] = useState(null);
  const [showEmojis, setShowEmojis] = useState(null);
  const [updateBody, setUpdateBody] = useState("");
  const [body, setBody] = useState("");
  const profile = users[recipient?.id];
  const messageUlRef = useRef(null);
  const prevRoom = useRef(null);
  const numMessages = useRef(0);

  useEffect(() => {
    if (id === prevRoom.current && numMessages.current < messages.length) {
      if (history.location.hash) history.push(history.location.pathname);
      scrollToBottom();
    }
    numMessages.current = messages.length;
  }, [messages, id, history]);

  useEffect(() => {
    dispatch(fetchDMChannel(parseInt(id)));
    scrollToBottom();
  }, [id, dispatch]);

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: "DmChannel", id: id },
      {
        received: ({ type, payload, id }) => {
          switch (type) {
            case "RECEIVE_DM_MESSAGE":
              payload.message["direct_message_channel_id"] =
                payload.message.directMessageChannelId;
              dispatch(receiveDMMessage(payload.message));
              break;
            case "DESTROY_DM_MESSAGE":
              dispatch(removeDMMessage(id));
              break;
            case "UPDATE_DM_MESSAGE":
              dispatch(patchDMMessage(payload.message));
              break;
            case "REMOVE_DM_REACTION":
              dispatch(removeDMReaction(id));
              break;
            case "RECEIVE_DM_REACTION":
              dispatch(receiveDMReaction(id));
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

  useEffect(()=>
    scrollToBottom(), [messages]
  )

  const scrollToBottom = () => {
    messageUlRef.current.scrollTop = messageUlRef.current.scrollHeight;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMessage({
      body,
      direct_message_channel_id: id,
      userId: currentUserId,
    }).then(() => {
      setBody("");
      scrollToBottom();
    });
  };

  const handleOptions = (message) => {
    setEdittingId(message.id);
    setUpdateBody(message.body);
  };

  const handleDelete = (message) => {
    destroyMessage(message.id);
    dispatch(removeDMMessage(message));
  };

  const handleUpdate = (e, message) => {
    e.preventDefault();
    let updatedMessage = {
      ...message,
      body: updateBody,
      editted: true,
    };
    dispatch(updateMessage(updatedMessage));
    setUpdateBody("");
    setEdittingId(null);
  };

  const all_messages = messages.map((message, index) =>
    message.id === edittingId ? (
      <form
        className={`update-form ${sessionUser.darkMode ? "update-dark" : ""}`}
      >
        <textarea
          className={`send-chat ${
            sessionUser.darkMode ? "send-chat-dark" : ""
          }`}
          rows={updateBody.split("\n").length}
          onChange={(e) => setUpdateBody(e.target.value)}
          placeholder={`Update ${message?.body}`}
          required
          onKeyDown={(e) => {
            if (e.code === "Enter" && !e.shiftKey) {
              handleUpdate(e, message);
            }
          }}
          value={updateBody}
        />
        <div className="edit-buttons">
          <button className="cancel-edit" onClick={() => setEdittingId(null)}>
            {" "}
            Cancel{" "}
          </button>
          <button
            className="save-edit"
            onClick={(e) => handleUpdate(e, message)}
          >
            {" "}
            Save
          </button>
        </div>
      </form>
    ) : (
      <li
        className={`message-back ${message.editted ? "message-editted " : ""}${
          sessionUser.darkMode ? "dark-hover" : ""
        }`}
        key={message.id}
        tabIndex={-1}
      >
        <div className={`message-x`}>
          {index === 0 || message?.userId !== messages[index - 1]?.userId ? (
            <Message
              {...message}
              className="message"
              setHidden={setHidden}
              setShowUser={setShowUser}
            />
          ) : (
            <div className="message-2">
              {message.body}
              <span id="editted">{message.editted ? "(editted)" : null}</span>
            </div>
          )}
          <div className="react-list">
            <div className="options">
              {showEmojis === message.id && (
                <EmojiList message={message} setShowEmojis={setShowEmojis} />
              )}
              <img
                id="react"
                alt="react"
                src={react}
                onClick={() => setShowEmojis(message.id)}
              />
              <img id="more-options" alt="options" src={options} />
              {message.userId === currentUserId && (
                <img
                  id="edit"
                  alt="edit"
                  onClick={() => handleOptions(message)}
                  src={edit}
                />
              )}
              {message.userId === currentUserId && (
                <img
                  id="trash"
                  alt="trash"
                  onClick={() => handleDelete(message)}
                  src={trash}
                />
              )}
            </div>
          </div>
        </div>
        <Emoji message={message} />
      </li>
    )
  );

  const handleProfile = () => {
    setHidden(false);
    setShowUser(profile);
  };

  const img = sessionUser.photoUrl
    ? sessionUser.photoUrl
    : "https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67";
  
  const rec_img = profile?.photoUrl
    ? profile?.photoUrl
    : "https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67";
  
  const userShow = hidden ? null : (
    <UserShowModal setHidden={setHidden} showUser={showUser} />
  );
  
  const start =
    sessionUser?.id === recipient?.id ? (
      <li className="start">
        <div className="start-dm">
          <img id="pfp10" src={img} alt="" />
          <div id="dm-name">
            <p id="stronger">
              {recipient?.firstName} {recipient?.lastName} 🔘
            </p>
            <p id="weaker">
              {" "}
              {recipient?.firstName} {recipient?.lastName}{" "}
            </p>
          </div>
        </div>
        <p className="p1">
          {" "}
          <strong> This is your space. </strong>
        </p>
        <p className={`p2 ${sessionUser.darkMode ? "p2-dark" : ""}`}>
          Draft messages, list your to-dos, or keep links and files handy. You
          can also talk to yourself here, but please bear in mind you’ll have to
          supply both sides of the conversation.
        </p>
      </li>
    ) : (
      <li className="start">
        <div className="start-dm">
          <img id="pfp10" src={rec_img} alt="" />
          <div id="dm-name">
            <p id="stronger">
              {recipient?.firstName} {recipient?.lastName} 🔘
            </p>
            <p id="weaker">
              {" "}
              {recipient?.firstName} {recipient?.lastName}{" "}
            </p>
          </div>
        </div>
        <p className="p1">
          This conversation is just between{" "}
          <span className={`blue ${sessionUser.darkMode ? "blue-dark" : ""}`}>
            @{recipient?.firstName} {recipient?.lastName}{" "}
          </span>{" "}
          and you{" "}
        </p>
        <p className={`p2 ${sessionUser.darkMode ? "p2-dark" : ""}`}>
          Check out their profile to learn more about them.{" "}
          <span
            onClick={handleProfile}
            className={`blue ${sessionUser.darkMode ? "blue-dark" : ""}`}
          >
            View Profile{" "}
          </span>
        </p>
      </li>
    );

  return (
    <div className={`room-home-div ${sessionUser.darkMode ? "dark-chat" : ""}`}>
      <section className="room-home-section">
        <div
          className={`border-under ${sessionUser.darkMode ? "dark-chat" : ""}`}
        >
          <h2 className="channel-name-top" onClick={handleProfile}>
            <span id='hash-name'> 
              <img id="pfp12" src={rec_img} alt="" />
              {recipient?.firstName} {recipient?.lastName}
              <span className="down-caret">▼</span>
            </span>
          </h2>
        </div>
        <ul ref={messageUlRef} className="messages-box">
          {start}
          {all_messages}
        </ul>
        <form onSubmit={handleSubmit}>
          <div id="message-form">
            <textarea
              className={`send-chat ${
                sessionUser.darkMode ? "send-chat-dark" : ""
              }`}
              rows={body.split("\n").length}
              onChange={(e) => setBody(e.target.value)}
              placeholder={`Message #${recipient?.firstName}`}
              required
              onKeyDown={(e) => {
                if (e.code === "Enter" && !e.shiftKey) {
                  handleSubmit(e);
                }
              }}
              value={body}
            />
            <button
              className={`submit-arrow ${
                sessionUser.darkMode ? "submit-arrow-dark" : null
              } ${body ? "submit-background" : ""}`}
              disabled={!body}
            >
              {" "}
              ↪{" "}
            </button>
          </div>
        </form>
      </section>
      {userShow}
    </div>
  );
}

export default DMRoom;
