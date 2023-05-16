import { useSelector } from "react-redux";
import "./Message.css";

const Message = (props) => {
  const formattedTime = getFormattedTime(props.createdAt);
  const users = useSelector((state) => state.users);
  const user = users[props.userId];

  const status_pics = {
    "In a meeting": '📅',
    "Commuting": '🚈',
    "A04 Flu": '🤒',
    "Vacationing": '🌴',
    "Working remotely": '🏠'
  }

  const handleShowModal = (e) => {
    e.preventDefault();
    props.setHidden(false);
    props.setShowUser(users[props.userId]);
  };
  
  const img = user?.photoUrl
    ? user?.photoUrl
    : "https://camo.githubusercontent.com/eb6a385e0a1f0f787d72c0b0e0275bc4516a261b96a749f1cd1aa4cb8736daba/68747470733a2f2f612e736c61636b2d656467652e636f6d2f64663130642f696d672f617661746172732f6176615f303032322d3531322e706e67";

  return Object.values(users).length > 0 ? (
    <div className="message">
      <div className="img-div">
        <img id="pfp3" src={img} alt=""></img>
      </div>
      <div className="message-content">
        <span className="message__author" onClick={handleShowModal}>
          {user?.firstName} {user?.lastName}  
        </span>
        <span id='user-status' title={user?.status}>
          {!user?.status ? null : (status_pics[user?.status] ? status_pics[user?.status] : '💬')}
        </span>
        <span className="message__timestamp">{formattedTime}</span>
        <p className="message__body">
          {props.body}
          <span id="editted">{props.editted ? "(editted)" : null}</span>
        </p>
      </div>
    </div>
  ) : (
    <></>
  );
};

function getFormattedTime(dateString) {
  const date = new Date(dateString);

  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();

  const startOfYesterday = startOfDay - 1000 * 60 * 60 * 24;

  let formattedTime = date.toLocaleTimeString([], {
    timeStyle: "short",
  });

  if (date.getTime() < startOfYesterday) {
    formattedTime = date.toDateString();
  } else if (date.getTime() < startOfDay) {
    formattedTime = `Yesterday at ${formattedTime}`;
  }

  return formattedTime;
}

export default Message;
