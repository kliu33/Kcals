import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./statusModal.css";

function StatusModal({ setStatusHidden, setHeaderHidden }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const closeModal = () => {
    setStatusHidden(true);
    setHeaderHidden();
  };

  const stopProp = (e) => {
    e.stopPropagation();
  }; 

  return (
    <div id="modal-back" onClick={closeModal}>
      <div
        className={`modal-upload ${
          sessionUser.darkMode ? "modal-upload-dark" : ""
        }`}
        onClick={stopProp}
      >
        <div>
            <p id="add-pfp">Set a status <span className="close-modal" onClick={closeModal}> X </span></p>
            <div id='status-wrapper'>
                <form>
                    <input type='text' id='status-input' placeholder="What's your status?"></input>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default StatusModal;