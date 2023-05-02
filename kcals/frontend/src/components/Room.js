import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { receiveMessage, removeMessage, getMessages, createMessage, destroyMessage, removeReaction, receiveReaction } from '../store/messages.js';
import { fetchChannel } from '../store/channels.js';
import { receiveUser } from '../store/users';
import Message from './Message';
import consumer from '../consumer.js';
import './Room.css'
import UsersInRoom from './usersInRoom.js';
import UserShowModal from './userShow/userShow.js';
import react from '../imgs/react.png';
import options from '../imgs/options.png'
import trash from '../imgs/trash.png'
import Emoji from './Emoji/Emoji.js';
import EmojiList from './Emoji/EmojiList.js';

function Room() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState('');
  const [hidden, setHidden] = useState(true);
  
  const [showUser, setShowUser] = useState({})
  const [showOptions, setShowOptions] = useState(false)
  const [showEmojis, setShowEmojis] = useState(null)
  const { id } = useParams();
  const messages = useSelector(getMessages(id));
  const sessionUser = useSelector(state => state.session.user)
  const currentUserId = sessionUser.id
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
              if (!Object.values(users).map(user => user.id).includes(payload.user.id)) {
                dispatch(receiveUser(payload.user));
              }
              dispatch(receiveMessage(payload.message));
              scrollToBottom();
              break;
            case 'DESTROY_MESSAGE':
              dispatch(removeMessage(id));
              break;
            case 'REMOVE_REACTION':
              dispatch(removeReaction(id));
              break;
            case 'RECEIVE_REACTION':
              dispatch(receiveReaction(id));
              break;
            default:
              console.log('Unhandled broadcast: ', type);
              break;
          }
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [id, dispatch, users]);

  
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

  // function copyToClip() {
  //   var copyText = document.getElementById("myInput");
  //   copyText.select();
  //   copyText.setSelectionRange(0, 99999);
  
  //   navigator.clipboard.writeText(copyText.value);
  
  //   // Alert the copied text
  //   alert("Copied the text: " + copyText.value);
  // }

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

  const handleOptions = (e) => {
    e.preventDefault();
    setShowOptions(!showOptions);
  }



  const all_messages = messages.map(message => (
    <li
      key={message.id}
      ref={activeMessageId === message.id ? activeMessageRef : null}
      tabIndex={-1}
      > 
      <div className={`message-x ${sessionUser.darkMode ? 'dark-hover' : null}`}>
        <Message {...message} className='message' setHidden={setHidden} setShowUser={setShowUser}/>
        <div className='react-list'>
        {showEmojis === message.id && (
                  <EmojiList message={message} setShowEmojis={setShowEmojis}/>
                )}
          <div className='options'>
            <img id="react" alt="react" src={react} onClick={()=>setShowEmojis(message.id)}/>
            <img id="more-options" alt="options" onClick={handleOptions} src={options}/>
          {message.userId === currentUserId && (
            <img id="trash" alt="trash" onClick={() => handleDelete(message.id)} src={trash}/>
          )}
        </div>
      </div>
    </div>
      <Emoji message = {message}/>
    </li>
  ))

  

  const userShow = hidden ? null : <UserShowModal setHidden={setHidden} showUser={showUser}/>

  return (
    <>
      <div className={`room-home-div ${sessionUser.darkMode ? 'dark-chat' : null}`}>
        <section className='room-home-section'>
          <div className={`border-under ${sessionUser.darkMode ? 'dark-chat' : null}`}> 
            <div>
              <h1> #{channel?.name} </h1> 
              {channel?.description}
            </div>
            <div>
              <span className='right-div' onClick={handleUsersModal} title="View all members of this channel"> {Object.values(users).length} members</span> 
            </div>
          </div>
          <ul ref={messageUlRef} className="messages-box">
            <li className='start'> <p className='p1'>This is the very beginning of the <span className='blue'># {channel?.name} </span> channel </p>
            <p className='p2'> This channel is for everything # {channel?.name}. Hold meetings, share docs, and make decisions together with your team.</p>
            </li>
            {all_messages}
          </ul>
          <form onSubmit={handleSubmit}>
            <div id="message-form">
            <textarea className={`send-chat ${sessionUser.darkMode ? 'send-chat-dark' : null}`}
              rows={body.split('\n').length}
              onChange={e => setBody(e.target.value)}
              placeholder={`Message #${channel?.name}`}
              required
              onKeyDown={e => {
                if (e.code === 'Enter' && !e.shiftKey) {
                  handleSubmit(e);
                }
              }}
              value={body}
            />
            <button className={`submit-arrow ${sessionUser.darkMode ? 'submit-arrow-dark' : null} ${body ? 'submit-background' : null}`} disabled={!body}> ↪ </button>
            </div>
          </form>
        </section>
        {userShow}
        {usersModal}
      </div>
    </>
  );
}

export default Room;