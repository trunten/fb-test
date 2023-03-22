// Global state
import { useContext } from "react";
import { FirebaseContext } from "../App";

// Anchor tags from urls in text
import Linkify from 'react-linkify';

// Assets
import bot from "../images/bot.png"


export default function MessageBubble({ message }) {
  const { auth, firestore } = useContext(FirebaseContext)
  const { text, uid, photoURL, isBot, liked, disliked } = message;
  const className = (uid === auth.currentUser.uid ? "sent" : "received");
  const ref = firestore.collection("messages").doc(message.id);

  async function likeMessage() {
    await ref.update({liked: !liked});
  }

  async function dislikeMessage() {
    await ref.update({disliked: !disliked});
  }
  
  return (
    <>
      <div className={`message ${className}`}>
        <img src={ isBot ? bot : photoURL } alt="avatar" />
        <p>
          <Linkify>{text}</Linkify>
          <span style={className === "sent" 
              ? {position:"absolute", bottom:"-16px", left:"100%", transform:"translateX(-100%)", display:"flex"} 
              : {position:"absolute", bottom:"-16px", left:"0", display:"flex"}}>
            <button className="no-style-btn" style={{marginRight: "5px"}} onClick={likeMessage} >
              <svg stroke="currentColor" fill={liked ? "#2e6af6" : "none"} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
            </button>
            <button className="no-style-btn" onClick={dislikeMessage} >
              <svg stroke="currentColor" fill={disliked ? "#2e6af6" : "none"} strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
            </button>
          </span>
        </p>
        
      </div>
      
    </>
  )
}