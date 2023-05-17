import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  receiveMessage,
  removeMessage,
  getMessages,
  createMessage,
  destroyMessage,
  removeReaction,
  receiveReaction,
  patchMessage,
} from "../store/messages.js";
import { fetchChannel } from "../store/channels.js";
import { receiveUser } from "../store/users";
import Message from "./Message";
import consumer from "../consumer.js";
import "./Room.css";
import UsersInRoom from "./usersInRoom.js";
import UserShowModal from "./userShow/userShow.js";
import react from "../imgs/react.png";
import options from "../imgs/options.png";
import edit from "../imgs/edit.png";
import trash from "../imgs/trash.png";
import Emoji from "./Emoji/Emoji.js";
import EmojiList from "./Emoji/EmojiList.js";
import AboutModal from "./AboutModal/aboutModal.js";
import { updateMessage } from "../store/messages.js";

function Room({ hidden, setHidden, showUser, setShowUser }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const messages = useSelector(getMessages(id));
  const sessionUser = useSelector((state) => state.session.user);
  const currentUserId = sessionUser.id;
  const channel = useSelector((state) => state.channels[id]);
  const users = useSelector((state) => state.users);
  const date = channel ? new Date(channel.createdAt) : null;
  const creator = users
    ? Object.values(users).find((user) => user.id === channel?.authorId)
    : null;

  const [body, setBody] = useState("");
  const [updateBody, setUpdateBody] = useState("");
  const [aboutHidden, setAboutHidden] = useState(true);
  const [showEmojis, setShowEmojis] = useState(null);
  const [edittingId, setEdittingId] = useState(null);
  const [users_hidden, setusersHidden] = useState(true);

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
    dispatch(fetchChannel(id)).then(() => {
      scrollToBottom();
    });
  }, [id, dispatch]);

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: "RoomsChannel", id: id },
      {
        received: ({ type, payload, id }) => {
          switch (type) {
            case "RECEIVE_MESSAGE":
              if (
                !Object.values(users)
                  .map((user) => user.id)
                  .includes(payload.user.id)
              ) {
                dispatch(receiveUser(payload.user));
              }
              dispatch(receiveMessage(payload.message));
              scrollToBottom();
              break;
            case "DESTROY_MESSAGE":
              dispatch(removeMessage(id));
              break;
            case "UPDATE_MESSAGE":
              dispatch(patchMessage(payload.message));
              break;
            case "REMOVE_REACTION":
              dispatch(removeReaction(id));
              break;
            case "RECEIVE_REACTION":
              dispatch(receiveReaction(id));
              break;
            default:
              console.log("Unhandled broadcast: ", type);
              break;
          }
        },
      }
    );

    return () => subscription?.unsubscribe();
  }, [id, dispatch, users]);

  const handleUsersModal = () => {
    setusersHidden(!users_hidden);
  };

  const scrollToBottom = () => {
    messageUlRef.current.scrollTop = messageUlRef.current.scrollHeight;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMessage({ body, channel_id: id, userId: currentUserId }).then(() => {
      setBody("");
    });
  };

  const handleDelete = (messageId) => {
    destroyMessage(messageId);
  };

  const handleOptions = (message) => {
    setEdittingId(message.id);
    setUpdateBody(message.body);
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

  const handleShowEmojis = (messageId) => {
    if (showEmojis === messageId) {
      setShowEmojis(null);
    } else {
      setShowEmojis(messageId);
    }
  };

  const usersModal = users_hidden ? null : (
    <UsersInRoom
      setHidden={setHidden}
      setShowUser={setShowUser}
      channel={channel}
      users={users}
      handleUsersModal={handleUsersModal}
    />
  );

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
            Send
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
                onClick={() => handleShowEmojis(message.id)}
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
                  onClick={() => handleDelete(message.id)}
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

  const userShow = hidden ? null : (
    <UserShowModal setHidden={setHidden} showUser={showUser} />
  );

  const channelAbout = aboutHidden ? null : (
    <AboutModal setAboutHidden={setAboutHidden} channel={channel} />
  );

  return (
    <>
      <div
        className={`room-home-div ${sessionUser.darkMode ? "dark-chat" : ""}`}
      >
        <section className="room-home-section">
          <div
            className={`border-under ${
              sessionUser.darkMode ? "dark-chat" : ""
            }`}
          >
            <div className="chat-header">
              <h2
                className="channel-name-top"
                onClick={() => setAboutHidden(false)}
              >
                <span id='hash-name'>
                <span id='hashtag'>#</span>{channel?.name}
                <span className="down-caret">▼</span></span>
              </h2>
              <h2 className="channel-description-top">
                {channel?.description}
              </h2>
            </div>
            <div>
              <span
                className={`right-div ${
                  sessionUser.darkMode ? "right-div-dark" : ""
                }`}
                onClick={handleUsersModal}
                title="View all members of this channel"
              >
                {" "}
                {Object.values(users).length}{" "}
                {`member${Object.values(users).length > 1 ? "s" : ""}`}
              </span>
            </div>
          </div>
          <ul ref={messageUlRef} className="messages-box">
            <li className="start">
              <h1>#{channel?.name}</h1>{" "}
              <p className="p1">
                {" "}
                {sessionUser.id === channel?.authorId
                  ? "You "
                  : `${creator?.firstName} ${creator?.lastName} `}
                created this channel on {months[date?.getMonth()]}{" "}
                {date?.getDate()}. This is the very beginning of the{" "}
                <span
                  className={`blue ${sessionUser.darkMode ? "blue-dark" : ""}`}
                >
                  # {channel?.name}{" "}
                </span>{" "}
                channel{" "}
              </p>
              <p className={`p2 ${sessionUser.darkMode ? "p2-dark" : ""}`}>
                {" "}
                This channel is for everything #{channel?.name}. Hold meetings,
                share docs, and make decisions together with your team.
              </p>
            </li>
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
                placeholder={`Message #${channel?.name}`}
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
        {usersModal}
        {channelAbout}
      </div>
    </>
  );
}

export default Room;
