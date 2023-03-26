// Global state
import { useContext } from "react";
import { FirebaseContext } from "../../App";

// Anchor tags from urls in text
import Linkify from "react-linkify";

// Import react libraries
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Assets
import bot from "../../images/bot.png";
import "./MessageBubble.css";
import sound from "../../sound/facebookchat.mp3";
import trash from "../../sound/trash.mp3";

export default function MessageBubble({ message }) {
  // Usestates
  const textRef = useRef(null);
  const [showTab, setShowTab] = useState(hasReactions() ? "tab-partial" : "");
  const [isClicked, setIsClicked] = useState(false);
  useEffect(()=>setShowTab("tab-partial"), [])

  const { auth, firestore } = useContext(FirebaseContext);
  const { text, uid, photoURL, isBot } = message;
  // console.log(message.img || "")
  const className = uid === auth.currentUser.uid ? "sent" : "received";
  const ref = firestore.collection("messages").doc(message.id);

  function deleteMessage(e) {
    if (uid === auth.currentUser.uid) {
      const audio = new Audio(trash);
      audio.play();
      setTimeout(async () => {
        await firestore.collection("messages").doc(message.id).delete();
      }, 200);
      
    }
  }

  function hasReactions() {
    return (message.like || 0) + (message.smile || 0) + (message.heart || 0) > 0;
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
    setShowTab(hasReactions() ? "tab-partial" : "");
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
          {(showTab === "tab-visible" || (showTab === "tab-partial" && message.smile > 0) ) && <motion.button
          onClick={() => addReaction("🙂")}
          className={`reaction-button ${isClicked ? "clicked" : ""} ${message.smile > 0 ? "": "zero"}`}
          whileTap={{ scale: 1.2 }}
        >
          <span>{message.smile}</span>
          <span>🙂</span>
        </motion.button>}
        {(showTab === "tab-visible" || (showTab === "tab-partial" && message.heart > 0) ) && <motion.button
          onClick={() => addReaction("❤️")}
          className={`reaction-button ${isClicked ? "clicked" : ""} ${message.heart > 0 ? "": "zero"}`}
          whileTap={{ scale: 1.2 }}
        >
          <span>{message.heart}</span>
          <span>❤️</span>
        </motion.button>}
        {(showTab === "tab-visible" || (showTab === "tab-partial" && message.like > 0) ) && <motion.button
          onClick={() => addReaction("👍")}
          className={`reaction-button ${isClicked ? "clicked" : ""} ${message.like > 0 ? "": "zero"}`}
          whileTap={{ scale: 1.2 }}
        >
          <span>{message.like}</span>
          <span>👍</span>
        </motion.button>}
        { showTab === "tab-visible" && uid === auth.currentUser.uid 
          ? (
              <motion.button onClick={deleteMessage} className="reaction-button zero delete" whileTap={{ scale: 1.2 }}>
                <span>🗑</span>
              </motion.button> 
            )
          : "" }

        </motion.div>
      )}
    </motion.div>
  );
}