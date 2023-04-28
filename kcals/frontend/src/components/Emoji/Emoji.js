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
        return '💗'
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
    <>
        {message.reactions ? message.reactions.map(reaction => <p key={reaction.id} className='reaction' onClick={()=>handleRemoveReact(reaction)}>{emoji_dict(reaction.emoji)}</p>) : null}
    </>
    )};
  
  export default Emoji;