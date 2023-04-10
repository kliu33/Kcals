import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { receiveMessage, removeMessage, getMessages, createMessage, destroyMessage } from '../store/messages.js';
import { fetchChannel } from '../store/channels.js';
import { receiveUser } from '../store/users';
import Message from './Message';
import consumer from '../consumer.js';
import './Room.css'
import UsersInRoom from './usersInRoom.js';

function Room() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState('');
  const { id } = useParams();
  const messages = useSelector(getMessages(id));
  const currentUserId = useSelector(state => state.session.user.id)
  const channel = useSelector(state => state.channels[id]);
  const users = useSelector(state => state.users)
  const activeMessageRef = useRef(null);
  const messageUlRef = useRef(null);
  const prevRoom = useRef(null);
  const numMessages = useRef(0);
  const activeMessageId = parseInt(history.location.hash.slice(1));

  // Scroll to message selected from mentions menu
  useEffect (() => {
    if (activeMessageRef.current) scrollToMessage();
  }, [activeMessageId]);

  useEffect(() => {
    if (id === prevRoom.current && numMessages.current < messages.length) {
      // Remove any hash values from the URL
      if (history.location.hash)
        history.push(history.location.pathname);
      scrollToBottom();
    }
    numMessages.current = messages.length;
  }, [messages, id, history]);

  // Effect to run when entering a room
  useEffect(() => {
    dispatch(fetchChannel(id)).then(() => {
      if (activeMessageRef.current) {
        scrollToMessage();
      } else {
        scrollToBottom();
      }
      prevRoom.current = id;
    });
  }, [id, dispatch]);

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: 'RoomsChannel', id: id },
      {
        received: ({ type, payload, id }) => {
          switch (type) {
            case 'RECEIVE_MESSAGE':
              dispatch(receiveMessage(payload.message));
              dispatch(receiveUser(payload.user));
              scrollToBottom();
              break;
            case 'DESTROY_MESSAGE':
              dispatch(removeMessage(id));
              break;
            default:
              console.log('Unhandled broadcast: ', type);
              break;
          }
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [id, dispatch]);

  
  const [users_hidden, setusersHidden] = useState(true)
  const handleUsersModal = (e) => {
      e.preventDefault();
      setusersHidden(!users_hidden)
  }
  
  const usersModal = users_hidden ? null : <UsersInRoom channel={channel} users={users} handleUsersModal={handleUsersModal}/>


  const scrollToMessage = () => {
    activeMessageRef.current.focus();
    activeMessageRef.current.scrollIntoView();
  };

  const scrollToBottom = () => {
    messageUlRef.current.scrollTop = messageUlRef.current.scrollHeight;
    
  };

  // const setReaction = (id, reaction) => {
  //   setUsersInRoom(prevUsersInRoom => ({ ...prevUsersInRoom, [id]: { ...prevUsersInRoom[id], reaction } }));
  // };

  const handleSubmit = e => {
    e.preventDefault();
    createMessage({ body, channel_id: id, userId: currentUserId }).then(() => {
      setBody('');
    });
  };

  const handleDelete = messageId => {
    destroyMessage(messageId)
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
        <div id='border-under'> 
          <h1> #{channel?.name} </h1> 
          <div>
            <span class='right-div' onClick={handleUsersModal}> {Object.values(users).length} </span> 
          </div>
          {channel?.description}
        </div>
        <ul ref={messageUlRef} className="messages-box">
          <li class='start'> <p class='p1'>This is the very beginning of the <span className='blue'># {channel?.name} </span> channel </p>
          <p class='p2'> This channel is for everything # {channel?.name}. Hold meetings, share docs, and make decisions together with your team.</p>
          </li>
          {messages.map(message => (
            <li
              key={message.id}
              ref={activeMessageId === message.id ? activeMessageRef : null}
              tabIndex={-1}
              className='message-x'
            >
              <Message {...message} class='message'/>
              {message.userId === currentUserId && (
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
      {usersModal}
      
    </div>
  );
}

export default Room;