import { useSelector } from "react-redux";
import './Message.css'

const Message = ({ body, userId, createdAt }) => {
    const formattedTime = getFormattedTime(createdAt);
    const users = useSelector(state => state.users)
    return (
      <div className='message'>
        <span className='message__author'>{users[userId].firstName} </span>
        <span className='message__timestamp'>{formattedTime}</span>
        <p className='message__body'>
          {body}
        </p>
      </div>
    );
  };
  
//   function getFormattedBody(body, usernames) {
//     return usernames.length
//       ? body
//         .split(new RegExp(`(${usernames.join('|')})`))
//         .map((text, idx) => idx % 2 === 0
//           ? text
//           : <strong key={text}>{text}</strong>
//         )
//       : body;
//   }
  
  function getFormattedTime(dateString) {
    const date = new Date(dateString);
  
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
  
    const startOfYesterday = startOfDay - (1000 * 60 * 60 * 24);
  
    let formattedTime = date.toLocaleTimeString([], {
      timeStyle: 'short'
    });
  
    if (date.getTime() < startOfYesterday) {
      formattedTime = date.toDateString();
    } else if (date.getTime() < startOfDay) {
      formattedTime = `Yesterday at ${formattedTime}`;
    }
  
    return formattedTime;
  }
  
  export default Message;
  