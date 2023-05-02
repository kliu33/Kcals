import React from 'react';
import './chatHeader.css'
import { useSelector } from 'react-redux';
import git from '../../imgs/github-logo.png'
import li from '../../imgs/linkedin.png'
import al from '../../imgs/angellist.png'


const ChatHeader = (props) => {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <div className={`header-div ${sessionUser.darkMode ? 'header-dark' : null}`}>
            <div className="links">
                <a href="https://github.com/kliu33/Kcals" target="_blank"><img id="logo" src={git}/></a>
                <a href="https://www.linkedin.com/in/kevin-liu-3a5b96158/" target="_blank"><img id="logo" src={li}/></a>
                <a href="https://wellfound.com/u/kevin-liu-149" target="_blank"><img id="logo" src={al}/></a>
            </div>
            <input placeholder='Search server' className={`searchBar ${sessionUser.darkMode ? 'search-dark' : null}`}></input>
            <img onClick={props.handleUserModal} id='pfp' src={'https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67'}></img>
        </div>
    )
}

export default ChatHeader