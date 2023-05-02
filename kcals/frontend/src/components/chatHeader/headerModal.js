import './chatHeader.css'
import {useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { updateColorMode } from "../../store/session";


function HeaderModal(props) {

    const dispatch = useDispatch();
    const stopProp = (e) => {
      e.stopPropagation()
    }
    
    const handleColor = (e) => {
        dispatch(updateColorMode(sessionUser))
    }

    const handleSubmit = (e) => {
        return dispatch(sessionActions.logout());
      }

    const sessionUser = useSelector(state => state.session.user);
    return (
        <div id='modal-back-users' onClick={props.handleUserModal}>
            <div className={`modal-users ${sessionUser.darkMode ? 'modal-users-dark' : null}`} onClick={stopProp}>
                <div id='pfp-name'>
                    <img id='pfp2' alt="pfp" src={'https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67'}></img>
                    <span id='name'>{sessionUser.firstName} {sessionUser.lastName}</span>
                </div>
                <div className="switch">
                    <label className="theme-switch">
                        <input type="checkbox" id="checkbox" defaultChecked={sessionUser.darkMode} onClick={handleColor}/>
                        <div className="slider round"></div>
                    </label>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div id='logout-div'>
                            <button type='submit' id='logout'>
                                Logout of Kcals
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
  }
  
  export default HeaderModal;