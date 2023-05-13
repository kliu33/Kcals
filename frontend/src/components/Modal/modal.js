import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as channelActions from "../../store/channels";
import "./modal.css";

function ChannelFormPage(props) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const closeModal = (e) => {
    e.preventDefault();
    e.cancelBubble = true;
    props.setHidden(true);
  };

  const stopProp = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    closeModal(e);

    const formDataObject = {
      name: name,
      description: description,
      author_id: sessionUser.id
    };

    const act =  channelActions.createChannel(formDataObject)

    return dispatch(act).catch(async (res) => {
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
  };

  return (
    <div id="modal-back" onClick={closeModal}>
      <div
        className={`modal ${sessionUser.darkMode ? "modal-dark" : ""}`}
        onClick={stopProp}
      >
        <form onSubmit={handleSubmit} id="channel-form">
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
          <p className="close-modal" onClick={closeModal}>
            {" "}
            X{" "}
          </p>
          <h1> {"Create a channel"} </h1>
          <p id="space">
            {" "}
            Channels are where your team comminicates. They're best when
            organized around a topic -- #marketing, for example.{" "}
          </p>
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
          <button type="submit" id="create">
            {"Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChannelFormPage;
