import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getDMMessages, createMessage, destroyMessage} from '../store/messages.js';
import { receiveDMMessage, removeDMMessage, removeDMReaction, receiveDMReaction } from '../store/session.js';
import Message from './Message';
import consumer from '../consumer.js';
import './Room.css'
import { receiveUser, fetchUsers } from '../store/users.js';
import react from '../imgs/react.png';
import trash from '../imgs/trash.png';
import options from '../imgs/options.png';
import Emoji from './Emoji/Emoji.js';
import EmojiList from './Emoji/EmojiList.js';
import UserShowModal from './userShow/userShow.js';


function DMRoom() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [hidden, setHidden] = useState(true);
  const [showUser, setShowUser] = useState({})
  const [showOptions, setShowOptions] = useState(false)
  const [showEmojis, setShowEmojis] = useState(null)
  const [body, setBody] = useState('');
  const { id } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const messages = useSelector(getDMMessages(parseInt(id)));
  const currentUserId = useSelector(state => state.session.user.id)
  const dm_channel = useSelector(state => state.session.user && state.session.user.directMessageChannels && state.session.user.directMessageChannels[id]);  const recipient = dm_channel ? (dm_channel.user1.id === sessionUser.id ? dm_channel.user2 : dm_channel.user1) : null
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
    dispatch(getDMMessages(parseInt(id)))
    dispatch(fetchUsers())
    scrollToBottom();
  }, [id, dispatch]);
  
  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: 'DmChannel', id: id },
      {
        received: ({ type, payload, id }) => {
          switch (type) {
            case 'RECEIVE_DM_MESSAGE':
              payload.message['direct_message_channel_id'] = payload.message.directMessageChannelId
              dispatch(receiveUser(payload.user));
              dispatch(receiveDMMessage(payload.message));
              scrollToBottom();
              break;
            case 'DESTROY_MESSAGE':
              dispatch(removeDMMessage(id));
              break;
            case 'REMOVE_DM_REACTION':
              dispatch(removeDMReaction(id));
              break;
            case 'RECEIVE_DM_REACTION':
              dispatch(receiveDMReaction(id));
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


//   const usersModal = users_hidden ? null : <UsersInRoom channel={channel} users={users} handleUsersModal={handleUsersModal}/>


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
    createMessage({ body, direct_message_channel_id: id, userId: currentUserId }).then(() => {
      setBody('');
      scrollToBottom();
    });
  };
  
  const handleOptions = (e) => {
    e.preventDefault();
    setShowOptions(!showOptions);
  }

  const handleDelete = message => {
    destroyMessage(message.id)
    dispatch(removeDMMessage(message));
  };



  const all_messages = messages.map(message => (
    <li
      key={message.id}
      ref={activeMessageId === message.id ? activeMessageRef : null}
      tabIndex={-1}
      > 
      <div className='message-x'>
        <Message {...message} className='message' setHidden={setHidden} setShowUser={setShowUser}/>
        <div className='react-list'>
        {showEmojis === message.id && (
                  <EmojiList message={message} setShowEmojis={setShowEmojis}/>
                )}
          <div className='options'>
            <img id="react" alt="react" src={react} onClick={()=>setShowEmojis(message.id)}/>
            <img id="more-options" alt="options" onClick={handleOptions} src={options}/>
          {message.userId === currentUserId && (
            <img id="trash" alt="trash" onClick={() => handleDelete(message)} src={trash}/>
          )}
        </div>
      </div>
    </div>
      <Emoji message = {message}/>
    </li>
  ))

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
  const userShow = hidden ? null : <UserShowModal setHidden={setHidden} showUser={showUser}/>

  return (
    <div className="room-home-div">
      <section className='room-home-section'>
        <div id='border-under'> 
          <h1> {recipient?.firstName} {recipient?.lastName} </h1> 
          {/* {channel?.description} */}
        </div>
        <ul ref={messageUlRef} className="messages-box">
          <li className='start'> <p className='p1'>This conversation is just between <span className='blue'>@{recipient?.firstName} {recipient?.lastName} </span> and you </p>
          <p className='p2'>Check out their profile to learn more about them.</p>
          </li>
          {all_messages}
        </ul>
        <form onSubmit={handleSubmit}>
          <textarea id='send-chat'
            rows={body.split('\n').length}
            onChange={e => setBody(e.target.value)}
            placeholder={`Message #${recipient?.firstName}`}
            onKeyDown={e => {
              if (e.code === 'Enter' && !e.shiftKey) {
                handleSubmit(e);
              }
            }}
            value={body}
          />
        </form>
      </section>
      {userShow}
      
    </div>
  );
}

export default DMRoom;