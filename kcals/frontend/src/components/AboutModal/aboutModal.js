import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './aboutModal.css'


function AboutModal({setAboutHidden, channel}) {

  const dispatch = useDispatch();
  const [tab, setTab] = useState('about')
  const users = useSelector(state => state.users)
  const sessionUser = useSelector(state => state.session.user);

  const closeModal = (e) => {
    setAboutHidden(true)
  }
  
  const stopProp = (e) => {
    e.stopPropagation()
  }

  const showTab = (tab === 'about') ? 
  <div className='about-div'> 
    <section className='sec1'>
        <h2>Name</h2>
        <p>{channel.name}</p>
    </section>
    <section className='sec2'>
        <h2>Description</h2>
        <p>{channel.description}</p>
    </section>
    <section>
        <h2>Created By</h2>
    </section>
  </div> 
  : 
  <div>Members</div>

  return (
    <div id='modal-back' onClick={closeModal}>
        <div className={`modal-about ${sessionUser.darkMode ? 'modal-about-dark' : ''}`} onClick={stopProp}>
            <div className='top-about-container'>
                <div className='top-about'>
                    <h2 id="about-channel"># {channel.name}</h2>
                    <h2 id="about-x">x</h2>
                </div>
                <div className='about-members'>
                    <div>
                        
                    </div>
                    <h2 className={`tabs ${tab === 'about' ? 'tab-selected' : ''}`} onClick={()=>setTab('about')}>About</h2>
                    <h2 className={`tabs ${tab === 'members' ? 'tab-selected' : ''}`} onClick={()=>setTab('members')}>Members <span id="users-length">{Object.values(users).length}</span></h2>
                </div>
            </div>
            <div className='bottom-about-container'>
                {showTab}
            </div>
        </div>
    </div>
  );
}

export default AboutModal;