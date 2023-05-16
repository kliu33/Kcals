import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./statusModal.css";

function StatusModal({ setStatusHidden }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [status, setStatus] = useState(sessionUser.status)
  const [emoji, setEmoji] = useState('💬')

  const closeModal = () => {
    setStatusHidden(true);
  };

  const setCheckStatus = (stat) => {
    setStatus(stat)
    switch(stat){
      case('In a meeting'):
        setEmoji('📅')
        break;
      case('Commuting'):
        setEmoji('🚈')
        break;
      case('A04 Flu'):
        setEmoji('🤒')
        break;
      case('Vacationing'):
        setEmoji('🌴')
        break;
      case('Working remotely'):
        setEmoji('🏠')
        break;
      default:
        setEmoji('💬')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/users/${sessionUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(status)
    });
    if (response.ok){
      closeModal();
    }
  }

  const stopProp = (e) => {
    e.stopPropagation();
  }; 

  return (
    <div id="modal-back" onClick={closeModal}>
      <div
        className={`modal-status ${
          sessionUser.darkMode ? "modal-status-dark" : ""
        }`}
        onClick={stopProp}
      >
        <div>
            <p id="add-pfp2">Set a status <span className="close-modal" onClick={closeModal}> X </span></p>
            <div id='status-wrapper'>
                <form onSubmit={handleSubmit}>
                    <span id='emoji-preview'>
                    {emoji}</span><input type='text' id='status-input' placeholder="What's your status?" 
                    onChange={(e)=>setCheckStatus(e.target.value)}
                    value={status}></input>
                    <div id='aa-status'>
                      <h2>
                        For App Academy
                      </h2>
                      <ul id='status-list'>
                        <li onClick={()=>setCheckStatus('In a meeting')}>
                          <p>📅 In a meeting</p>
                        </li>
                        <li onClick={()=>setCheckStatus('Commuting')}>
                          <p>🚈 Commuting</p>
                        </li>
                        <li onClick={()=>setCheckStatus('A04 Flu')}>
                          <p>🤒 A04 Flu</p>
                        </li>
                        <li onClick={()=>setCheckStatus('Vacationing')}>
                          <p>🌴 Vacationing</p>
                        </li>
                        <li onClick={()=>setCheckStatus('Working remotely')}>
                          <p>🏠 Working remotely</p>
                        </li>
                      </ul>
                    </div>
                    <div className="button-div2">
                      <button className="cancel-pfp" onClick={closeModal}>
                        Cancel
                      </button>
                      <button
                        className={`update-pfp ${status !== sessionUser.status ? "uploaded" : ""}`}
                        disabled={status !== '' ? false : true}
                      >     
                        Save
                      </button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default StatusModal;