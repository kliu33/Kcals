import './Emoji.css'
import { createReaction, deleteReaction, removeReaction } from '../../store/messages';
import { useSelector, useDispatch } from 'react-redux';

const Emoji = ({message}) => {
  const emoji_obj = {
    'smile': message.reactions.filter(reaction => reaction.emoji === 'smile'),
    'heart': message.reactions.filter(reaction => reaction.emoji === 'heart'),
    'thumbs-up': message.reactions.filter(reaction => reaction.emoji === 'thumbs-up'),
    'thumbs-down': message.reactions.filter(reaction => reaction.emoji === 'thumbs-down'),
    'laughing': message.reactions.filter(reaction => reaction.emoji === 'laughing'),
  }
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const emoji_dict = (emoji) => {
    switch(emoji) {
      case 'smile':
        return `🙂 ${Object.values(message.reactions).filter(emoj => emoj.emoji === 'smile').length}`
      case 'heart':
        return `💗 ${Object.values(message.reactions).filter(emoj => emoj.emoji === 'heart').length}`
      case 'thumbs-up':
        return `👍 ${Object.values(message.reactions).filter(emoj => emoj.emoji === 'thumbs-up').length}`
      case 'thumbs-down':
        return `👎 ${Object.values(message.reactions).filter(emoj => emoj.emoji === 'thumbs-down').length}`
      case 'laughing':
        return `😂 ${Object.values(message.reactions).filter(emoj => emoj.emoji === 'laughing').length}`
      default:
        return null;
    }
  }

  const handleRemoveReact = (k) => {
    let react = emoji_obj[k].find(react => react.user_id === sessionUser.id)
    if (react){
        dispatch(removeReaction(react))
        deleteReaction(react.id);
    } else {
        let new_react = {
          emoji: k,
          message_id: message.id,
          user_id: sessionUser.id
        };
        createReaction(new_react)
    }
  }


return (
    <div className='emoji-list'>
        {emoji_obj ? Object.keys(emoji_obj).map(k => emoji_obj[k].length > 0 ? <p className='reaction' onClick={()=>
        handleRemoveReact(k)}>{emoji_dict(k)}</p> : null) : null}
    </div>
    )};
  
  export default Emoji;