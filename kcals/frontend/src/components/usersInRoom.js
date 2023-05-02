import { useSelector } from 'react-redux';

function UsersInRoom({channel, users, handleUsersModal}) {
    const sessionUser = useSelector(state => state.session.user);
    const stopProp = (e) => {
      e.stopPropagation()
    }
    const usersArr = Object.values(users)
    const usersinroom = usersArr.map((user) => <div className="user-list"><span id='pfp4'>{user.firstName[0]}</span><span id='pfp5'> {user.firstName} {user.lastName}</span></div>)

    return (
        <div id='modal-back' onClick={handleUsersModal}>
            <div className={`users-modal ${sessionUser.darkMode ? 'users-modal-dark' : null}`} onClick={stopProp}>
                <a className="close-modal" onClick = {handleUsersModal}> X </a>
                <h1># {channel.name}</h1>
                <p>Members: {usersArr.length}</p>
                <br></br>
                {usersinroom}
            </div>
        </div>
    );
  }
  
  export default UsersInRoom;