import {useSelector} from "react-redux";

function usersModal(props) {

    const stopProp = (e) => {
      e.stopPropagation()
    }
    return (
        <div id='modal-back-users' onClick={props.handleUserModal}>
            <h1> users </h1>
        </div>
    );
  }
  
  export default usersModal;