// Global state
import { useContext } from "react";
import { FirebaseContext } from "../../App";

// Anchor tags from urls in text
import Linkify from "react-linkify";

// Import react libraries
import { useRef, useState } from "react";
import { motion } from "framer-motion";

// Assets
import bot from "../../images/bot.png";
import "./MessageBubble.css";
import { BsEmojiSmile, BsHandThumbsUp, BsHeart } from "react-icons/bs";
import sound from "../../sound/facebookchat.mp3";

export default function MessageBubble({ message }) {
  // Usestates
  const textRef = useRef(null);
  const [showTab, setShowTab] = useState("");
  const [isClicked, setIsClicked] = useState(false);

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
    if (!isClicked) {
      setIsClicked(true);
      const audio = new Audio(sound);
      audio.play();
    }
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
    <motion.div
      className="message-box"
      ref={textRef}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`message ${className}`}>
        <img src={isBot ? bot : photoURL} alt="avatar" />
        <p onDoubleClick={deleteMessage}>
          <Linkify>{text}</Linkify>
        </p>
      </div>
      {true && (
        <motion.div
          className={`tab ${showTab}`}
          style={
            className === "sent"
              ? { display: "flex", justifyContent: "end", marginRight: "45px" }
              : { display: "flex", marginLeft: "45px" }
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
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
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
