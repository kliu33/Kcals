import React from "react";
import "./channelItem.css";
// import { useState } from 'react';
import { NavLink } from "react-router-dom/cjs/react-router-dom";
// import RightClickMenu from './rightClickMenu';
import { useSelector } from "react-redux";

const DMChannelItem = ({ dm_channel, selected }) => {
  const users = useSelector((state) => state.users);
  const sessionUser = useSelector((state) => state.session.user);

  const status_pics = {
    "In a meeting": '📅',
    "Commuting": '🚈',
    "A04 Flu": '🤒',
    "Vacationing": '🌴',
    "Working remotely": '🏠'
  }

  const recipient =
    dm_channel.user1.id === sessionUser.id
      ? dm_channel.user2
      : dm_channel.user1;

  const creator = users
    ? Object.values(users).find((user) => user.id === recipient?.id)
    : null;

  const img = creator?.photoUrl
    ? creator?.photoUrl
    : "https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67";

  return (
    <li>
      <NavLink to={`/dm_channels/${dm_channel.id}`}>
        <div
          className={`channel-div channel-name dm-channel-container ${
            selected === dm_channel.id ? "blue-chan" : ""
          }`}
        >
          <img id="pfp9" src={img} alt=""></img>
          {recipient?.firstName} {recipient?.lastName}{" "}
          <span className="you">
            {sessionUser.id === recipient?.id ? "you" : ""}
          </span>
          
          <span id='user-status' title={creator?.status}>
            {!creator?.status ? null : (status_pics[creator?.status] ? status_pics[creator?.status] : '💬')}
         </span>
        </div>
      </NavLink>
    </li>
  );
};

export default DMChannelItem;
