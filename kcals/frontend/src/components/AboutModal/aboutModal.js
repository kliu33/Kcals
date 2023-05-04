import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './aboutModal.css'


function AboutModal({setAboutHidden, channel}) {

  const dispatch = useDispatch();
  const users = useSelector(state => state.users)
  const sessionUser = useSelector(state => state.session.user);

  const closeModal = (e) => {
    setAboutHidden(true)
  }
  
  const stopProp = (e) => {
    e.stopPropagation()
  }

  return (
    <div id='modal-back' onClick={closeModal}>
        <div className={`modal-about ${sessionUser.darkMode ? 'modal-about-dark' : ''}`} onClick={stopProp}>
            <div className='top-about'>
                <h2 id="about-channel">#{channel.name}</h2>
                <h2 id="about-x">x</h2>
            </div>
            <div className='about-members'>
                <h2 className='tabs'>About</h2>
                <h2 className='tabs'>Members <span id="users-length">{Object.values(users).length}</span></h2>
            </div>
        </div>
    </div>
  );
}

export default AboutModal;