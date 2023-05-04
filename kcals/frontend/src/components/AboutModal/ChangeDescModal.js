import React from 'react';
import './aboutModal.css'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ChangeDescModal = ({channel, setDescHidden}) => {
    const sessionUser = useSelector(state => state.session.user);
    
    const [newDesc, setNewDesc] = useState(channel.description)
    const handleModal = (e) => {
        e.stopPropagation()
        setDescHidden(true)
    }
    
    return (
        <div id='modal-back-2' onClick={handleModal}>
            <div className='change-modal' onClick={(e)=>e.stopPropagation()}>
                <div className='top-about'>
                    <h2 id='about-channel'> Rename this channel</h2>
                    <h2 id="about-x" onClick={handleModal}>x</h2>
                </div>
                <form className='edit-form'>
                    <div>
                        <h2> Channel name </h2>
                        <input className='update-text'
                        type='text'
                        onChange={e => setNewDesc(e.target.value)}
                        placeholder={`Update ${channel?.body}`}
                        value={newDesc}></input>
                        <p> Names must be lowercase, without spaces or periods, and can’t be longer than 80 characters.</p>
                    </div>
                    <div className='edit-buttons2'>
                        <button className='cancel-pfp' onClick={handleModal}> Cancel </button>
                        <button className={`update-pfp ${channel.description !=  newDesc? "uploaded" : ''}`} disabled={`${channel.description !=  newDesc? "false" : 'true'}`}> Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangeDescModal