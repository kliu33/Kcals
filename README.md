# Kcals

[Kcals](https://kcals.onrender.com/) is a full-stack clone of the popular team communication and collaboration platform, Slack. This application provides a comprehensive set of features and functionalities that allow users to create channels, send messages, and create direct messages. The app also supports real-time messaging, which means users can communicate with their colleagues in real-time, and receive instant notifications when someone mentions them or sends them a direct message.


## Technologies and libraries used:

  - Ruby on Rails
  - JavaScript
  - React/Redux
  - PostgreSQL
  - Action Cable

## With Kcals, users can:

 - ### Create new text channels with a custom name and description
  
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
  
  ![image](https://user-images.githubusercontent.com/30753677/234086962-4fbf72fe-fcae-4af7-9646-8ee9d5fbd0dd.png)
  
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

- ### Display members of a channel

![image](https://user-images.githubusercontent.com/30753677/234089793-574bd31d-eb01-4602-97c4-e0b8251e4c26.png)

