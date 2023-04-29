import './Emoji.css'
import { deleteReaction, removeReaction } from '../../store/messages';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const EmojiList = (props) => {
  const sessionUser = useSelector(state => state.session.user);


return (
            <ul id='list-of-emojis'>
                <li className='choose-emoji'>🙂</li>
                <li className='choose-emoji'>💗</li>
                <li className='choose-emoji'>👍</li>
                <li className='choose-emoji'>👎</li>
                <li className='choose-emoji'>😂</li>
            </ul>
    )};
  
  export default EmojiList;