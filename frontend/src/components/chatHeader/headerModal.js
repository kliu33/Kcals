import "./chatHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as sessionActions from "../../store/session";
import UploadModal from "../UploadModal/uploadModal";
import StatusModal from "../StatusModal/statusModal";

function HeaderModal(props) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const [statusHidden, setStatusHidden] = useState(true)

  const status_pics = {
    "In a meeting": '📅',
    "Commuting": '🚈',
    "A04 Flu": '🤒',
    "Vacationing": '🌴',
    "Working remotely": '🏠'
  }

  const img = sessionUser.photoUrl
    ? sessionUser.photoUrl
    : "https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67";

  const stopProp = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = () => {
    return dispatch(sessionActions.logout());
  };

  const clearStatus = async (e) => {
    const new_status = {
      ...sessionUser,
      status: ""
    }
    const response = await fetch(`/api/users/${sessionUser.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(new_status)
    });
    if (response.ok){
      props.handleUserModal()
    }
  }

  const uploadModal = hidden ? null : (
    <UploadModal
      setHidden={setHidden}
      setHeaderHidden={props.handleUserModal}
    />
  );

  const statusModal = statusHidden ? null : 
    <StatusModal 
    setHeaderHidden={props.setHeaderHidden}
    setStatusHidden={setStatusHidden}/>
  
  const stat_emoj = sessionUser.status ? (status_pics[sessionUser?.status] ? status_pics[sessionUser?.status] : '💬') : <span id='smiley'></span>

  return (
    <div id="modal-back-users" onClick={props.handleUserModal}>
      <div
        className={`modal-users ${
          sessionUser.darkMode ? "modal-users-dark" : ""
        }`}
        onClick={stopProp}
      >
        <div id="pfp-name">
          <img id="pfp2" src={img} alt="" />
          <span id="name">
            {sessionUser.firstName} {sessionUser.lastName}
          </span>
        </div>
        
        <div id='status-block'>
          <button className={`status-button ${
          sessionUser.darkMode ? "status-button-dark" : ""
        }`} onClick={()=> setStatusHidden(false)}> {stat_emoj} { sessionUser.status ? sessionUser.status : 'Update your status'}</button>
        </div>
        <div className="user-modal-options">
          {sessionUser.status ? <h2 id='logout-2' onClick={clearStatus}> Clear status</h2> : null}

          <h2 id="logout" onClick={() => setHidden(false)}>
            Upload Profile Photo
          </h2>

          <form onSubmit={handleSubmit}>
            <div id="logout-div">
              <button type="submit" id="logout">
                Logout of Kcals
              </button>
            </div>
          </form>
        </div>
      </div>
      {uploadModal}
      {statusModal}
    </div>
  );
}

export default HeaderModal;
