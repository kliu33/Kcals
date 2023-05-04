import React from 'react';
import './aboutModal.css'
import { useSelector } from 'react-redux';
import { useState } from 'react';


const ChangeNameModal = ({channel, setNameHidden}) => {

    const [newName, setNewName] = useState(channel.name)
    
    const handleModal = (e) => {
        e.stopPropagation()
        setNameHidden(true)
    }

    const sessionUser = useSelector(state => state.session.user);
    
    return (
        <div  id='modal-back-2' onClick={handleModal}>
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
                        onChange={e => setNewName(e.target.value)}
                        placeholder={`Update ${channel?.body}`}
                        value={newName}></input>
                        <p> Names must be lowercase, without spaces or periods, and can’t be longer than 80 characters.</p>
                    </div>
                    <div className='edit-buttons2'>
                        <button className='cancel-pfp' onClick={handleModal}> Cancel </button>
                        <button className={`update-pfp ${channel.name !=  newName? "uploaded" : ''}`} disabled={`${channel.name !=  newName? "false" : 'true'}`}> Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangeNameModal