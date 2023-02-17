
function UsersInRoom({channel, users, handleUsersModal}) {
    const stopProp = (e) => {
      e.stopPropagation()
    }
    console.log(users)
    const usersArr = Object.values(users)
    const usersinroom = usersArr.map((user) => <div className="user-list"><span id='pfp4'>{user.firstName[0]}</span><span id='pfp5'> {user.firstName} {user.lastName}</span></div>)

    return (
        <div id='modal-back' onClick={handleUsersModal}>
            <div id='users-modal' onClick={stopProp}>
                <a class="close-modal" onClick = {handleUsersModal}> X </a>
                <h1># {channel.name}</h1>
                <p>Members: {usersArr.length}</p>
                <br></br>
                {usersinroom}
            </div>
        </div>
    );
  }
  
  export default UsersInRoom;