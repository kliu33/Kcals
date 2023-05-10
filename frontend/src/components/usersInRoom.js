import { useSelector } from 'react-redux';

function UsersInRoom({channel, users, handleUsersModal, setShowUser, setHidden}) {
    const sessionUser = useSelector(state => state.session.user);
    const stopProp = (e) => {
      e.stopPropagation()
    }

    const handleMember = (user) => {
        handleUsersModal();
        setHidden(false)
        setShowUser(user)
    }

    const usersArr = Object.values(users)
    const usersinroom = usersArr.map((user) => <div key={user.id} onClick={()=>handleMember(user)} className={`user-list ${sessionUser.darkMode ? 'user-list-dark' : ''}`}><img id='pfp3' src={user?.photoUrl ? user?.photoUrl : 'https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67'} alt=""></img><span id='pfp5'> {user.firstName} {user.lastName}</span></div>)

    return (
        <div id='modal-back' onClick={handleUsersModal}>
            <div className={`users-modal ${sessionUser.darkMode ? 'users-modal-dark' : ''}`} onClick={stopProp}>
                <p className="close-modal" onClick = {handleUsersModal}> X </p>
                <h1># {channel.name}</h1>
                <p>Members: {usersArr.length}</p>
                <br></br>
                <div id='members-list'>
                    {usersinroom}
                </div>
            </div>
        </div>
    );
  }
  
  export default UsersInRoom;