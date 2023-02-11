import './rightClick.css'
import { useSelector } from 'react-redux'
import Owner from './rightClickOptions/owner'
import Member from './rightClickOptions/member'


function RightClickMenu(props) {

  const channel = props.channel

  const stopProp = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const sessionUser = useSelector(state => state.session.user);
  const option = (channel.authorId === sessionUser.id) ? <Owner channel={channel}/> : <Member />;
    return (
        <div class="right-click-bg" onClick={props.setHidden}>
            <div class="right-click-menu" onClick={stopProp} style={{top: props.posY, left:props.posX}}>
                {option}
            </div>
        </div>
    );
  }
  
  export default RightClickMenu;