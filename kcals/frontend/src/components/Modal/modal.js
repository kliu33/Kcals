import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as channelActions from '../../store/channels';
import './modal.css'


function ChannelFormPage(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const formDataObject = {
        name: name,
        description: description,
        author_id: sessionUser.id
    }
    return dispatch(channelActions.createChannel(formDataObject))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  const closeModal = (e) => {
    e.preventDefault()
    props.setHidden(true)
  }

  return (
    <div id='modal-back'>
    <div id='modal'>
    <form onSubmit={handleSubmit} id = "channel-form">
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <a class="close-modal" onClick = {closeModal}> X </a>
      <h1> Create a channel </h1>
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
      <button type="submit" id="create" onClick={closeModal}>Create</button>
    </form>
    </div>
    </div>
  );
}

export default ChannelFormPage;