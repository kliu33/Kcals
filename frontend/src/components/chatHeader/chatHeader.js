import React, { useState } from 'react';
import './chatHeader.css'
import { useSelector } from 'react-redux';
import git from '../../imgs/github-logo.png'
import logo from '../../imgs/logo_copy.png'
import li from '../../imgs/linkedin.png'
import al from '../../imgs/angellist.png'


const ChatHeader = (props) => {
    const [search, setSearch] = useState('')
    const sessionUser = useSelector(state => state.session.user);
    const channels = useSelector(state => Object.values(state.channels))
    const users = useSelector(state => Object.values(state.users))
    const img = sessionUser.photoUrl ? sessionUser.photoUrl : "https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67"
    const search_channels = channels?.filter(channel => channel.name.toLowerCase().includes(search.toLowerCase()))
    const search_users = users?.filter(user => (user.firstName + user.lastName).toLowerCase().includes(search.toLowerCase()))
    let channel_list = search_channels.map(channel => 
        <li className='search-item'>
            <span id='hash'>#</span> 
            {channel.name} 
            <span id='search-desc'>{channel.description.substring(0,20)}</span>
        </li>)
    let user_list = search_users.map(user => 
        <li className='search-item'>
            <img id='pfp11' src={user.photoUrl ? user.photoUrl : "https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67"}></img>
            {user.firstName} {user.lastName} 
            <span id='active-circle'>🔘</span>
        </li>)
    const display = channel_list.length === 0 && user_list.length === 0 ? 
    <ul className={`search-results ${sessionUser.darkMode ? 'search-results-dark' : ""}`}>
        <li className='search-item'>
            <img id='logo' src={logo}></img> 
            <span>No matching results</span>
        </li>
    </ul> 
    : 
    <ul className={`search-results ${sessionUser.darkMode ? 'search-results-dark' : ""}`}>
        {channel_list}{user_list}
    </ul>
    const search_results = search !== '' ? display : null;
    return (
        <div className={`header-div ${sessionUser.darkMode ? 'header-dark' : ''}`}>
            <div className="links">
                <a href="https://github.com/kliu33/Kcals" target="_blank" rel="noreferrer"><img id="logo" alt="git" src={git}/></a>
                <a href="https://www.linkedin.com/in/kliu33/" target="_blank" rel="noreferrer"><img id="logo" alt='linkedin' src={li}/></a>
                <a href="https://wellfound.com/u/kevin-liu-149" target="_blank" rel="noreferrer"><img id="logo" alt="angellist" src={al}/></a>
            </div>
            <div className={`search-div`}>
                <input placeholder={`🔍︎ Search ${search === '' ? 'server' : search}`} className={`searchBar ${sessionUser.darkMode ? 'search-dark' : ''}`} value={search} onChange={(e)=>setSearch(e.target.value)}></input>
                {search_results}
            </div>
            {search !== '' ? <span className='clear-search' onClick={()=> setSearch('')}>Clear</span> : null}
            <img onClick={props.handleUserModal} id='pfp' alt="pfp" src={img}></img>
        </div>
    )
}

export default ChatHeader