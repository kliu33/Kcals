import './userShow.css'
import {useDispatch, useSelector } from 'react-redux';
import msg from '../../imgs/message.png'

function UserShowModal(props) {

    const handleUserShow = (e) => {
        e.preventDefault();
        props.setHidden(true)
    }

    const sessionUser = useSelector(state => state.session.user);
    return (
        <div className='userInfo'>
            <h2 className='show-head'> Profile 
                <p className="close-user-modal" onClick={handleUserShow}>x</p>
            </h2>
            <div className="img-div">
                <img id='pfp6' src={'https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67'} alt=""></img>
            </div>
            <h1 id="show-name">{props.showUser.firstName} {props.showUser.lastName}</h1>
            <button id="message-button"> 
                <img id="msg-img" src={msg}/>
            Message </button>
        </div>
    );
  }
  
  export default UserShowModal;