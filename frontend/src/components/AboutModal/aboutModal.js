import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./aboutModal.css";
import { deleteChannel } from "../../store/channels";
import ChangeDescModal from "./ChangeDescModal";
import ChangeNameModal from "./ChangeNameModal";

function AboutModal({ setAboutHidden, channel }) {
  const dispatch = useDispatch();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(channel.createdAt);

  const [tab, setTab] = useState("about");
  const [nameHidden, setNameHidden] = useState(true);
  const [descHidden, setDescHidden] = useState(true);

  const users = useSelector((state) => state.users);
  const sessionUser = useSelector((state) => state.session.user);
  const usersArr = Object.values(users);
  const creator = Object.values(users).find(
    (user) => user.id === channel.authorId
  );

  const closeModal = () => {
    setAboutHidden(true);
  };

  const stopProp = (e) => {
    e.stopPropagation();
  };

  const handleDelete = (e) => {
    dispatch(deleteChannel(channel.id));
    closeModal();
  };

  const usersInRoom = usersArr.map((user) => (
    <div
      key={user.id}
      className={`user-list-about ${
        sessionUser.darkMode ? "user-list-about-dark" : ""
      }`}
    >
      <img
        id="pfp3"
        src={
          user?.photoUrl
            ? user?.photoUrl
            : "https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67"
        }
        alt=""
      ></img>
      <span id="pfp5">
        {" "}
        {user.firstName} {user.lastName}
      </span>
    </div>
  ));

  const showTab =
    tab === "about" ? (
      <div
        className={`about-div ${sessionUser.darkMode ? "about-div-dark" : ""}`}
      >
        <section className="sec1">
          <div className="add-edit">
            <h2>Channel name</h2>
            {sessionUser.id === creator.id ? (
              <h3
                className="edit-in-modal"
                onClick={() => setNameHidden(false)}
              >
                Edit
              </h3>
            ) : null}
          </div>
          <p>{channel.name}</p>
        </section>
        <section className="sec2">
          <div className="add-edit">
            <h2>Description</h2>
            {sessionUser.id === creator.id ? (
              <h3
                className="edit-in-modal"
                onClick={() => setDescHidden(false)}
              >
                Edit
              </h3>
            ) : null}
          </div>
          <p>{channel.description}</p>
          <div></div>
        </section>
        <section>
          <h2>Created By</h2>
          <p>
            {creator?.firstName} {creator?.lastName} on{" "}
            {months[date?.getMonth()]} {date?.getDate()}, {date?.getFullYear()}
          </p>
        </section>
        {sessionUser.id === creator?.id ? (
          <section className="delete-sec" onClick={handleDelete}>
            <h2>Delete Channel</h2>
          </section>
        ) : null}
      </div>
    ) : (
      usersInRoom
    );

  const changeNameModal = nameHidden ? null : (
    <ChangeNameModal channel={channel} setNameHidden={setNameHidden} />
  );
  const changeDescModal = descHidden ? null : (
    <ChangeDescModal channel={channel} setDescHidden={setDescHidden} />
  );

  return (
    <div id="modal-back" onClick={closeModal}>
      <div
        className={`modal-about ${
          sessionUser.darkMode ? "modal-about-dark" : ""
        }`}
        onClick={stopProp}
      >
        <div
          className={`top-about-container${
            sessionUser.darkMode ? "-dark" : ""
          }`}
        >
          <div className="top-about">
            <h2 id="about-channel"># {channel.name}</h2>
            <h2 id="about-x" onClick={closeModal}>
              x
            </h2>
          </div>
          <div className="about-members">
            <div></div>
            <h2
              className={`tabs ${tab === "about" ? "tab-selected" : ""}`}
              onClick={() => setTab("about")}
            >
              About
            </h2>
            <h2
              className={`tabs ${tab === "members" ? "tab-selected" : ""}`}
              onClick={() => setTab("members")}
            >
              Members{" "}
              <span id="users-length">{Object.values(users).length}</span>
            </h2>
          </div>
        </div>
        <div className="bottom-about-container">{showTab}</div>
      </div>
      {changeDescModal}
      {changeNameModal}
    </div>
  );
}

export default AboutModal;
