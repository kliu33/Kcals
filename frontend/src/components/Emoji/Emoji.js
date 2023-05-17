import "./Emoji.css";
import { createReaction, deleteReaction } from "../../store/messages";
import { useSelector } from "react-redux";

const Emoji = ({ message }) => {

  const sessionUser = useSelector((state) => state.session.user);
  let smile = []
  let heart = []
  let thumbsup = []
  let thumbsdown = []
  let laughing = []

  message.reactions.forEach(reaction => {
    switch(reaction.emoji){
      case "smile":
        if (!smile.some(obj => obj.id === reaction.id)) {
          smile.push(reaction);
        }
        break;
      case "heart":
        if (!heart.some(obj => obj.id === reaction.id)) {
          heart.push(reaction);
        }
        break;
      case "thumbs-up":
        if (!thumbsup.some(obj => obj.id === reaction.id)) {
          thumbsup.push(reaction);
        }
        break;
      case "thumbs-down":
        if (!thumbsdown.some(obj => obj.id === reaction.id)) {
          thumbsdown.push(reaction);
        }
        break;
      case "laughing":
        if (!laughing.some(obj => obj.id === reaction.id)) {
          laughing.push(reaction);
        }
        break;
      default:
        break;
    }
  }
)
  const handleReact = (k) => {
    let react = k.find((react) => react.user_id === sessionUser.id);
    if (react) {
      deleteReaction(react.id);
    } else {
      let new_react = {
        emoji: k[0].emoji,
        message_id: message.id,
        user_id: sessionUser.id,
      };
      createReaction(new_react);
    }
  };

  return (
    <div className="emoji-list">
      {smile.length >= 1 ? <p
                key='smile'
                className={`reaction ${
                  sessionUser.darkMode ? "reaction-dark" : null
                } ${
                  smile.find((react) => react.user_id === sessionUser.id)
                    ? `react-hilight ${
                        sessionUser.darkMode ? "react-hilight-dark" : ""
                      }`
                    : ""
                }`}
                onClick={() => handleReact(smile)}
              > 🙂 {smile.length}</p> : null}
      {heart.length >= 1 ? <p
                key='heart'
                className={`reaction ${
                  sessionUser.darkMode ? "reaction-dark" : null
                } ${
                  heart.find((react) => react.user_id === sessionUser.id)
                    ? `react-hilight ${
                        sessionUser.darkMode ? "react-hilight-dark" : ""
                      }`
                    : ""
                }`}
                onClick={() => handleReact(heart)}
              > 💗 {heart.length}</p> : null}
      {laughing.length >= 1 ? <p
                key='laughing'
                className={`reaction ${
                  sessionUser.darkMode ? "reaction-dark" : null
                } ${
                  laughing.find((react) => react.user_id === sessionUser.id)
                    ? `react-hilight ${
                        sessionUser.darkMode ? "react-hilight-dark" : ""
                      }`
                    : ""
                }`}
                onClick={() => handleReact(laughing)}
              > 😂 {laughing.length}</p> : null}
        {thumbsup.length >= 1 ? <p
                key='thumbsup'
                className={`reaction ${
                  sessionUser.darkMode ? "reaction-dark" : null
                } ${
                  thumbsup.find((react) => react.user_id === sessionUser.id)
                    ? `react-hilight ${
                        sessionUser.darkMode ? "react-hilight-dark" : ""
                      }`
                    : ""
                }`}
                onClick={() => handleReact(thumbsup)}
              > 👍 {thumbsup.length}</p> : null}
        {thumbsdown.length >= 1 ? <p
                key='thumbsdown'
                className={`reaction ${
                  sessionUser.darkMode ? "reaction-dark" : null
                } ${
                  thumbsdown.find((react) => react.user_id === sessionUser.id)
                    ? `react-hilight ${
                        sessionUser.darkMode ? "react-hilight-dark" : ""
                      }`
                    : ""
                }`}
                onClick={() => handleReact(thumbsdown)}
              > 👎 {thumbsdown.length}</p> : null}
    </div>
  );
};

export default Emoji;
