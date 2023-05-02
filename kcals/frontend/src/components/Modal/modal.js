import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as channelActions from '../../store/channels';
import './modal.css'


function ChannelFormPage(props) {

  const def_name = props.channel ? props.channel.name : ''
  const def_description = props.channel ? props.channel.description : ''
  const dispatch = useDispatch();
  const [name, setName] = useState(def_name);
  const [description, setDescription] = useState(def_description);
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    closeModal(e);

    const formDataObject = {
        name: name,
        description: description,
        author_id: sessionUser.id,
        id: (props.channel ? props.channel.id : null)
    }

    const formDataObject2 = {
      name: name,
      description: description,
      author_id: sessionUser.id
  }

    const act = props.channel ? channelActions.updateChannel(formDataObject) : channelActions.createChannel(formDataObject2)
    return dispatch(act)
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
    e.cancelBubble = true
    props.setHidden(true)
  }
  
  const stopProp = (e) => {
    e.stopPropagation()
  }

  return (
    <div id='modal-back' onClick={closeModal}>
    <div className={`modal ${sessionUser.darkMode ? 'modal-dark' : null}`} onClick={stopProp}>
    <form onSubmit={handleSubmit} id = "channel-form">
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <a className="close-modal" onClick = {closeModal}> X </a>
      <h1> {props.channel ? "Update channel" : "Create a channel"} </h1>
      <p id="space"> Channels are where your team comminicates. They're best when organized around
        a topic -- #marketing, for example. </p>
      <label>
        <p className="label">Name </p>
        <br></br>
        <input
          className="input"
          type="text"
          value={name}
          placeholder="# e.g. plan-budget"
          onChange={(e) => setName(e.target.value)}
          required
          />
          <br></br>
        </label>
        <label>
            <h3 className="label"> Description (optional) </h3>
            <br></br>
            <input
              className="input"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
              <br></br>
              What's this channel about?
              <br></br>
        </label>
      <button type="submit" id="create">{props.channel ? "Update" : "Create"}</button>
    </form>
    </div>
    </div>
  );
}

export default ChannelFormPage;