import './Emoji.css'
import { deleteReaction, removeReaction } from '../../store/messages';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const Emoji = ({message}) => {
  const sessionUser = useSelector(state => state.session.user);
  const { id } = useParams();
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

  const handleRemoveReact = (reaction) => {
    if (sessionUser.id === reaction.user_id) {
        dispatch(removeReaction(reaction))
        deleteReaction(reaction.id);
    }
  }


return (
    <div className='emoji-list'>
        {message.reactions ? message.reactions.map(reaction => <p key={reaction.id} className='reaction' onClick={()=>handleRemoveReact(reaction)}>{emoji_dict(reaction.emoji)}</p>) : null}
    </div>
    )};
  
  export default Emoji;