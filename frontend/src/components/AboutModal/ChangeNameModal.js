import React from 'react';
import './aboutModal.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateChannel } from '../../store/channels';


const ChangeNameModal = ({channel, setNameHidden}) => {
    const dispatch = useDispatch();
    const [newName, setNewName] = useState(channel.name)
    const handleModal = (e) => {
        e.stopPropagation()
        setNameHidden(true)
    }

    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        let newChannel = {
            ...channel,
            name: newName
        }
        dispatch(updateChannel(newChannel))
        setNameHidden(true)
    }
    
    return (
        <div className={`modal-back-2 ${sessionUser.darkMode ? 'modal-back-2-dark' : ''}`} onClick={handleModal}>
            <div className={`change-modal ${sessionUser.darkMode ? 'change-modal-dark' : ''}`} onClick={(e)=>e.stopPropagation()}>
                <div className='top-about'>
                    <h2 id='about-channel'> Rename this channel</h2>
                    <h2 id="about-x" onClick={handleModal}>x</h2>
                </div>
                <form className={`edit-form ${sessionUser.darkMode ? 'edit-form-dark' : ''}`}>
                    <div>
                        <h2> Channel name </h2>
                        <input className={`update-text ${sessionUser.darkMode ? 'update-text-dark' : ''}`}
                        type='text'
                        onChange={e => setNewName(e.target.value)}
                        placeholder={`Update channel name`}
                        value={newName}
                        onKeyDown={e => {
                            if (e.code === 'Enter' && !e.shiftKey) {
                                handleSubmit(e);
                            }
                        }}
                        >
                        </input>
                        <p> Names must be lowercase, without spaces or periods, and can’t be longer than 80 characters.</p>
                    </div>
                    <div className='edit-buttons2'>
                        <button className={`cancel-channel-edit ${sessionUser.darkMode ? 'cancel-channel-edit-dark' : ''}`} onClick={handleModal}> Cancel </button>
                        <button onClick={(e)=> handleSubmit(e)} className={`update-pfp ${channel.name !==  newName? "uploaded" : ''}`}> Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangeNameModal