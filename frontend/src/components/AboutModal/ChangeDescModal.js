import React from "react";
import "./aboutModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateChannel } from "../../store/channels";

const ChangeDescModal = ({ channel, setDescHidden }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [newDesc, setNewDesc] = useState(channel.description);

  const handleModal = (e) => {
    e.stopPropagation();
    setDescHidden(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newChannel = {
      ...channel,
      description: newDesc,
    };
    dispatch(updateChannel(newChannel));
    setDescHidden(true);
  };

  return (
    <div
      className={`modal-back-2 ${
        sessionUser.darkMode ? "modal-back-2-dark" : ""
      }`}
      onClick={handleModal}
    >
      <div
        className={`change-modal ${
          sessionUser.darkMode ? "change-modal-dark" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="top-about">
          <h2 id="about-channel"> Edit Description</h2>
          <h2 id="about-x" onClick={handleModal}>
            x
          </h2>
        </div>
        <form
          className={`edit-form ${
            sessionUser.darkMode ? "edit-form-dark" : ""
          }`}
        >
          <div>
            <textarea
              className={`update-desc ${
                sessionUser.darkMode ? "update-desc-dark" : ""
              }`}
              type="text"
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder={`Update description`}
              value={newDesc}
              onKeyDown={(e) => {
                if (e.code === "Enter" && !e.shiftKey) {
                  handleSubmit(e);
                }
              }}
            ></textarea>
            <p> Let people know what this channel is for.</p>
          </div>
          <div className="edit-buttons2">
            <button
              className={`cancel-channel-edit ${
                sessionUser.darkMode ? "cancel-channel-edit-dark" : ""
              }`}
              onClick={handleModal}
            >
              {" "}
              Cancel{" "}
            </button>
            <button
              onClick={(e) => handleSubmit(e)}
              className={`update-pfp ${
                channel?.description !== newDesc ? "uploaded" : ""
              }`}
            >
              {" "}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeDescModal;
