import './Emoji.css'
import { createReaction, deleteReaction } from '../../store/messages';
import { useSelector } from 'react-redux';

const Emoji = ({message}) => {
  const emoji_obj = {
    'smile': message.reactions.filter(reaction => reaction.emoji === 'smile'),
    'heart': message.reactions.filter(reaction => reaction.emoji === 'heart'),
    'thumbs-up': message.reactions.filter(reaction => reaction.emoji === 'thumbs-up'),
    'thumbs-down': message.reactions.filter(reaction => reaction.emoji === 'thumbs-down'),
    'laughing': message.reactions.filter(reaction => reaction.emoji === 'laughing'),
  }
  const sessionUser = useSelector(state => state.session.user);

  const emoji_dict = (emoji) => {
    switch(emoji) {
      case 'smile':
        return `🙂 ${emoji_obj[emoji].length}`
      case 'heart':
        return `💗 ${emoji_obj[emoji].length}`
      case 'thumbs-up':
        return `👍 ${emoji_obj[emoji].length}`
      case 'thumbs-down':
        return `👎 ${emoji_obj[emoji].length}`
      case 'laughing':
        return `😂 ${emoji_obj[emoji].length}`
      default:
        return null;
    }
  }

  const handleRemoveReact = (k) => {
    let react = emoji_obj[k].find(react => react.user_id === sessionUser.id)
    if (react){
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
        {emoji_obj ? Object.keys(emoji_obj).map(k => emoji_obj[k].length > 0 ? <p key={k} className={`reaction ${sessionUser.darkMode ? 'reaction-dark' : null} ${
            emoji_obj[k].find(react => react.user_id === sessionUser.id) ? `react-hilight ${sessionUser.darkMode ? 'react-hilight-dark' : ''}` : ''}`} onClick={()=>
        handleRemoveReact(k)}>{emoji_dict(k)}</p> : null) : null}
    </div>
    )};
  
  export default Emoji;