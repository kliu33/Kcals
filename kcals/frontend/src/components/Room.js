import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { receiveMessage, removeMessage, getMessages, createMessage, destroyMessage } from '../store/messages.js';
import { fetchChannel } from '../store/channels.js';
import { receiveUser } from '../store/users';
import Message from './Message';
import consumer from '../consumer.js';
import './Room.css'
import usersModal from './usersModal.js';

function Room() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState('');
  const [usersInRoom, setUsersInRoom] = useState({});
  const [hidden, setHidden] = useState(true)
  const { channelId } = useParams();
  const messages = useSelector(getMessages(channelId));
  const currentUserId = useSelector(state => state.session.user.id)
  const channel = useSelector(state => state.channels[channelId]);
  const users = useSelector(state => state.users)
  const activeMessageRef = useRef(null);
  const messageUlRef = useRef(null);
  const prevRoom = useRef(null);
  const numMessages = useRef(0);
  const showUsers = hidden ? null : <usersModal />
  const activeMessageId = parseInt(history.location.hash.slice(1));
  const usersInRoomArray = Object.values(usersInRoom);

  // Scroll to message selected from mentions menu
  useEffect (() => {
    if (activeMessageRef.current) scrollToMessage();
  }, [activeMessageId]);

  // Scroll to new messages as they come in
  // useEffect(() => {
  //   if (channelId === prevRoom.current && numMessages.current < messages.length) {
  //     // Remove any hash values from the URL
  //     if (history.location.hash)
  //       history.push(history.location.pathname);
  //     scrollToBottom();
  //   }
  //   numMessages.current = messages.length;
  // }, [messages, channelId, history]);

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

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: 'RoomsChannel', id: channelId },
      {
        received: ({ message, user }) => {
          dispatch(receiveMessage(message));
          dispatch(receiveUser(user));
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [channelId, dispatch]);

  const handleModal = (e) => {
    e.preventDefault();

  }

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
    createMessage({ body, channelId, userId: currentUserId }).then(() => {
      setBody('');
    });
  };

  const handleDelete = messageId => {
    destroyMessage(messageId).then(() => {
      removeMessage(messageId);
    });
  };

  // const generateReactions = (...reactions) => {
  //   return reactions.map(reaction => (
  //     <span
  //       key={reaction}
  //       className='reaction'
  //       onClick={() => setReaction(currentUserId, reaction)}
  //     >
  //       {reaction}
  //     </ span>
  //   ));
  // };

  return (
    <div class="room-home-div">
      <section className='room-home-section'>
        <div id='border-under'> <h1> #{channel?.name} </h1> <p class='right-div' onClick={handleModal}> {Object.values(users).length} </p> 
        {channel?.description}</div>
        <ul ref={messageUlRef} className="messages-box">
          {messages.map(message => (
            <li
              key={message.id}
              ref={activeMessageId === message.id ? activeMessageRef : null}
              tabIndex={-1}
            >
              <Message {...message} class='message'/>
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
          <textarea id='send-chat'
            rows={body.split('\n').length}
            onChange={e => setBody(e.target.value)}
            placeholder={`Message #${channel?.name}`}
            onKeyDown={e => {
              if (e.code === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
            value={body}
          />
        </form>
      </section>
      {showUsers}
    </div>
  );
}

export default Room;