// Global state
import { useContext } from "react";
import { FirebaseContext } from "../../App";

// Anchor tags from urls in text
import Linkify from "react-linkify";

// Import react libraries
import { useRef, useState } from "react";

// Assets
import bot from "../../images/bot.png";
import "./MessageBubble.css";
import { BsEmojiSmile, BsHandThumbsUp, BsHeart } from "react-icons/bs";

export default function MessageBubble({ message }) {
  // Usestates
  const textRef = useRef(null);
  const [showTab, setShowTab] = useState("");

  const { auth, firestore } = useContext(FirebaseContext);
  const { text, uid, photoURL, isBot } = message;
  const className = uid === auth.currentUser.uid ? "sent" : "received";
  const ref = firestore.collection("messages").doc(message.id);

  async function deleteMessage(e) {
    if (uid === auth.currentUser.uid) {
      await firestore.collection("messages").doc(message.id).delete();
    }
  }

  // Mouse over for emoji
  const addReaction = async (emoji) => {
    if (emoji === "🙂") {
      await ref.update({ smile: (message.smile || 0) + 1 });
    }

    if (emoji === "❤️") {
      await ref.update({ heart: (message.heart || 0) + 1 });
    }
    if (emoji === "👍") {
      await ref.update({ like: (message.like || 0) + 1 });
    }
  };

  const handleMouseOver = () => {
    setShowTab("tab-visible");
  };

  const handleMouseOut = () => {
    setShowTab("");
  };

  return (
    <div className="message-box" ref={textRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={`message ${className}`}>
        <img src={isBot ? bot : photoURL} alt="avatar" />
        <p onDoubleClick={deleteMessage}>
          <Linkify>{text}</Linkify>
        </p>
      </div>
      {true && (
        <div className={`tab ${showTab}`} style={ className === "sent"
            ? { display: "flex", justifyContent: "end", marginRight: "45px", }
            : {display: "flex", marginLeft: "45px", }}>
          <button onClick={() => addReaction("🙂")} className="reaction-button">
            <span>{message.smile}</span>
            <BsEmojiSmile />
          </button>
          <button onClick={() => addReaction("❤️")} className="reaction-button">
            <span>{message.heart}</span>
            <BsHeart />
          </button>
          <button onClick={() => addReaction("👍")} className="reaction-button">
            <span>{message.like}</span>
            <BsHandThumbsUp />
          </button>
        </div>
      )}
    </div>
  );
}
