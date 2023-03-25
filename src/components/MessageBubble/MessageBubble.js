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
    const handleClick = () => {
      setIsClicked(true);
      const audio = new Audio(sound);
      audio.play();
    };
    handleClick();
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
        <p>
          <Linkify>{text}</Linkify>
        </p>
      </div>
      {true && (
        <motion.div
          className={`tab ${showTab}`}
          style={ className === "sent"
              ? { display: "flex", justifyContent: "end", marginRight: "45px" }
              : { display: "flex", marginLeft: "45px" }
          }
          transition={{ opacity: { duration: 0.5 } }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.button
            onClick={() => addReaction("🙂")}
            className={`reaction-button delete ${isClicked ? "clicked" : ""}`}
            whileTap={{ scale: 1.2 }}
          >
            <span>{message.smile}</span>
            {message.smile > 0 ? (
              "🙂"
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 -1 496 512"
                height="1.1em"
                width="1.2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"></path>
              </svg>
            )}
          </motion.button>
          <motion.button
            onClick={() => addReaction("❤️")}
            className={`reaction-button delete ${isClicked ? "clicked" : ""}`}
            whileTap={{ scale: 1.2 }}
          >
            <span>{message.heart}</span>
            {message.heart > 0 ? (
              "❤️"
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 -1 16 16"
                height="1.1em"
                width="1.2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </motion.button>
          <motion.button
            onClick={() => addReaction("👍")}
            className={`reaction-button delete ${isClicked ? "clicked" : ""}`}
            whileTap={{ scale: 1.2 }}
          >
            <span>{message.like}</span>
            {message.like ? (
              "👍"
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1.1em"
                width="1.2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M15.98 8.17l-.97 5.95C14.84 15.5 13.13 16 12 16H5.69c-.2 0-.38-.05-.53-.14L3.72 15H2c-1.06 0-2-.94-2-2V9c0-1.06.94-2.02 2-2h2c.91 0 1.39-.45 2.39-1.55.91-1 .88-1.8.63-3.27-.08-.5.06-1 .42-1.42C7.83.29 8.42 0 9 0c1.83 0 3 3.71 3 5.01l-.02.98h2.04c1.16 0 1.95.8 1.98 1.97 0 .11-.02.21-.02.21zm-1.97-1.19h-1.99c-.7 0-1.03-.28-1.03-.97l.03-1.03c0-1.27-1.17-4-2-4-.5 0-1.08.5-1 1 .25 1.58.34 2.78-.89 4.14C6.11 7.25 5.36 8 4 8v6l1.67 1H12c.73 0 1.95-.31 2-1l.02-.02 1-6c-.03-.64-.38-1-1-1h-.01z"
                ></path>
              </svg>
            )}
          </motion.button>
          {uid === auth.currentUser.uid ? (
            <button onClick={deleteMessage} className="reaction-button delete">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1.1em"
                width="1.2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"></path>
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          ) : (
            ""
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
