import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { receiveMessage, removeMessage, getMessages, createMessage, destroyMessage } from '../store/messages.js';
import { fetchChannel } from '../store/channels.js';
import { receiveUser } from '../store/users';
import Message from './Message';

function Room() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState('');
  const [usersInRoom, setUsersInRoom] = useState({});

  const { channelId } = useParams();
  const messages = useSelector(getMessages(channelId));
  const currentUserId = useSelector(state => state.currentUserId)
  const room = useSelector(state => state.channels[channelId]);

  const activeMessageRef = useRef(null);
  const messageUlRef = useRef(null);
  const prevRoom = useRef(null);
  const numMessages = useRef(0);

  const activeMessageId = parseInt(history.location.hash.slice(1));
  const usersInRoomArray = Object.values(usersInRoom);

  // Scroll to message selected from mentions menu
  useEffect (() => {
    if (activeMessageRef.current) scrollToMessage();
  }, [activeMessageId]);

  // Scroll to new messages as they come in
  useEffect(() => {
    if (channelId === prevRoom.current && numMessages.current < messages.length) {
      // Remove any hash values from the URL
      if (history.location.hash)
        history.push(history.location.pathname);
      scrollToBottom();
    }
    numMessages.current = messages.length;
  }, [messages, channelId, history]);

  // Effect to run when entering a room
  useEffect(() => {
    dispatch(fetchChannel(channelId)).then(() => {
      if (activeMessageRef.current) {
        scrollToMessage();
      } else {
        scrollToBottom();
      }
      prevRoom.current = channelId;
    });
  }, [channelId, dispatch]);

  const scrollToMessage = () => {
    activeMessageRef.current.focus();
    activeMessageRef.current.scrollIntoView();
  };

  const scrollToBottom = () => {
    messageUlRef.current.scrollTop = messageUlRef.current.scrollHeight;
  };

  const setReaction = (id, reaction) => {
    setUsersInRoom(prevUsersInRoom => ({ ...prevUsersInRoom, [id]: { ...prevUsersInRoom[id], reaction } }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    createMessage({ body, channelId, authorId: currentUserId }).then(({ message, user }) => {
      dispatch(receiveMessage(message));
      dispatch(receiveUser(user));
      setBody('');
    });
  };

  const handleDelete = messageId => {
    destroyMessage(messageId).then(() => {
      removeMessage(messageId);
    });
  };

  const generateReactions = (...reactions) => {
    return reactions.map(reaction => (
      <span
        key={reaction}
        className='reaction'
        onClick={() => setReaction(currentUserId, reaction)}
      >
        {reaction}
      </ span>
    ));
  };

  return (
    <>
      <section className='room home-section'>
        <h1>{room?.name}</h1>

        <ul ref={messageUlRef}>
          {messages.map(message => (
            <li
              key={message.id}
              ref={activeMessageId === message.id ? activeMessageRef : null}
              tabIndex={-1}
            >
              <Message {...message} />
              {message.authorId === currentUserId && (
                <button
                  className='btn-delete'
                  onClick={() => handleDelete(message.id)}
                >
                  x
                </button>
              )}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={body.split('\n').length}
            onChange={e => setBody(e.target.value)}
            onKeyDown={e => {
              if (e.code === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
            value={body}
          />
          <div className='message-controls'>
            <div>
              {generateReactions('👍', '❤️', '🔥', '😡')}
            </div>
            <button className='btn-primary' disabled={!body}>
              Send Message
            </button>
          </div>
        </form>
      </section>
      <section className='online-users home-section'>
        <h2>In Room</h2>
        <ul >
          {usersInRoomArray.map(({ id, username, reaction }) => (
            <li key={id} className={currentUserId === id ? 'current' : ''}>
              <span className='reaction'>{reaction}</span>
              <span>{username}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Room;