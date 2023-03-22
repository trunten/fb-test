// Global state
import { useContext } from "react";
import { FirebaseContext } from "../App";

// Anchor tags from urls in text
import Linkify from 'react-linkify';

// Assets
import bot from "../images/bot.png"


export default function MessageBubble({ message }) {
  const { auth } = useContext(FirebaseContext)
  const { text, uid, photoURL, isBot } = message;
  const className = uid === auth.currentUser.uid ? "sent" : "received";
  
  return (
    <div className={`message ${className}`}>
      <img src={ isBot ? bot : photoURL } alt="avatar" />
      <p><Linkify>{text}</Linkify></p>
    </div>
  )
}