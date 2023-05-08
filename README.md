# [Kcals](https://kcals.herokuapp.com/)

Kcals is a full-stack clone of the popular team communication and collaboration platform, Slack. This application provides a comprehensive set of features and functionalities that allow users to create channels, send messages, and create direct messages. The app also supports real-time messaging, which means users can communicate with their colleagues in real-time, and receive instant notifications when someone mentions them or sends them a direct message.


## Technologies and libraries used:

  - Ruby on Rails
  - JavaScript
  - React/Redux
  - PostgreSQL
  - Action Cable

## With Kcals, users can:

 - ### Create public text channels with a custom name and description
  
  ![image](https://user-images.githubusercontent.com/30753677/233995448-31456909-e16d-47c1-be7e-4ad0a747bb26.png)
  
   
  Once the user requests to either make or update a text channel, a modal pops up that prompts the user to input a server name and an optional description. The form will be prefilled with the channel's information if it is an update request. That information is then passed to the modal component as a prop, and the component will dynamically return the form.
  
  ```
  <form onSubmit={handleSubmit} id = "channel-form">
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <a class="close-modal" onClick = {closeModal}> X </a>
      <h1> {props.channel ? "Update channel" : "Create a channel"} </h1>
      <p id="space"> Channels are where your team comminicates. They're best when organized around
        a topic -- #marketing, for example. </p>
      <label>
        <p class="label">Name </p>
        <br></br>
        <input
          class="input"
          type="text"
          value={name}
          placeholder="# e.g. plan-budget"
          onChange={(e) => setName(e.target.value)}
          />
          <br></br>
        </label>
        <label>
            <h3 class="label"> Description (optional) </h3>
            <br></br>
            <input
              class="input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
              <br></br>
              What's this channel about?
              <br></br>
        </label>
      <button type="submit" id="create">{props.channel ? "Update" : "Create"}</button>
  ```
  
 - ### Send and receive messages in real time
  
  ![image](https://user-images.githubusercontent.com/30753677/236091110-1c3369a5-8310-41e4-92ea-3255818a9137.png)

  
  Using ActionCable, users are able to send and receive messages to everyone in the text channel in real-time. Users are also able to delete and edit their messages in real-time, something that Slack requires you to pay for.
  
  ```
  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: 'RoomsChannel', id: id },
      {
        received: ({ type, payload, id }) => {
          switch (type) {
            case 'RECEIVE_MESSAGE':
              dispatch(receiveMessage(payload.message));
              dispatch(receiveUser(payload.user));
              scrollToBottom();
              break;
            case 'DESTROY_MESSAGE':
              dispatch(removeMessage(id));
              break;
            default:
              console.log('Unhandled broadcast: ', type);
              break;
          }
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [id, dispatch]);
  ```
  
  Action Cable allows users to subscribe to a channel. This is what enables real-time messaging. As users create, edit, or delete messages, the action will then be broadcasted to everyone currently subscribed to that channel, which then dispatches the appropriate action on the receiver's end.

- ### Directly message users privately

![image](https://user-images.githubusercontent.com/30753677/236104847-e359f41b-10b9-416e-a049-b3ce3e6bc3e5.png)

  Users can create and leave direct messaging channels with other users. The messages will only be viewable by the two users and noone else. Direct message channels also features live messaging and reactions that will be broadcasted to the other user.

![image](https://user-images.githubusercontent.com/30753677/235471777-79f51f51-b76f-496b-914c-db383ef11c03.png)

Direct messaging channels also uses Action Cable to subscribe users to the direct message channels they are present in. This allows users to receive/destroy messages as well as receive and destroy reactions in realtime along with the other user.

- ### React to messages with emojis!

![image](https://user-images.githubusercontent.com/30753677/236105251-c02f7040-a5f8-4b5e-ad4b-19034836a1e5.png)

![image](https://user-images.githubusercontent.com/30753677/235472731-34fa0853-0e02-4144-8887-dbbe32eaed31.png)


With our custum set of emojis users can react to messages in real time. As you can see from the code, the emoji list is very modifyable and can very easily be built upon to add more custom emojis!

### This project also includes:

- Seed data
- A Production README

## Future features:

- ~~Implement Amazon Web Services (AWS) for custum user profile pictures~~
- ~~Add dark mode~~
- Functional search bar
- Direct messaging between more than 2 users
- Ability to add custom emojis
- Ability to edit messages 

## Sources:

- Images and videos on splash page taken from Slack
