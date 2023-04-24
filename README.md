# Kcals

[Kcals](https://kcals.onrender.com/) is a full-stack clone of the popular team communication and collaboration platform, Slack. This application provides a comprehensive set of features and functionalities that allow users to create channels, send messages, and create direct messages. The app also supports real-time messaging, which means users can communicate with their colleagues in real-time, and receive instant notifications when someone mentions them or sends them a direct message.


## Technologies and libraries used:

  - Ruby on Rails
  - JavaScript
  - React/Redux
  - PostgreSQL
  - Action Cable

## With Kcals, users can:

  -Create new text channels with a custom name and description
  
  ![image](https://user-images.githubusercontent.com/30753677/233995448-31456909-e16d-47c1-be7e-4ad0a747bb26.png)
  
   
  Once the user requests to either make or update a text channel, a modal pops up that prompts the user to input a server name and an optional description. The form will be prefilled with the channels information if it is an update request. That information is the passed to the modal componenent as a prop and the component will return the form accordingly.
  
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
      <button typ
  ```
