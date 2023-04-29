import './Emoji.css'
import { createReaction, receiveReaction} from '../../store/messages';
import { useSelector, useDispatch } from 'react-redux';

const EmojiList = (props) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


  const handleCreateReaction = (emoji) => {
    let new_react = {
      emoji: emoji,
      message_id: props.message.id,
      user_id: sessionUser.id
    };
  
    createReaction(new_react)
  };

return (
            <ul id='list-of-emojis'>
                <li className='choose-emoji' onClick={()=>handleCreateReaction('smile')}>🙂</li>
                <li className='choose-emoji' onClick={()=>handleCreateReaction('heart')}>💗</li>
                <li className='choose-emoji' onClick={()=>handleCreateReaction('thumbs-up')}>👍</li>
                <li className='choose-emoji' onClick={()=>handleCreateReaction('thumbs-down')}>👎</li>
                <li className='choose-emoji' onClick={()=>handleCreateReaction('laughing')}>😂</li>
            </ul>
    )};
  
  export default EmojiList;