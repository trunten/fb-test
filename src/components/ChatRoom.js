// Glocal state
import { useContext } from "react";
import { FirebaseContext } from "../App";

// Hooks
import { useRef, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { serverTimestamp } from 'firebase/firestore';

// Components
import MessageBubble from "./MessageBubble";
import Chatbot from "./Chatbot";

const mb = { marginBottom: "10px" };

export default function ChatRoom({ roomID }) {
  const {auth, appFirestore } = useContext(FirebaseContext)
  const messagesCollection = appFirestore.collection("messages");
  const query = messagesCollection.orderBy("createdAt");
  const [messages] = useCollectionData(query, {idField: "id"});
  const msgText = useRef(0);
  const bottom = useRef(0);
  roomID = roomID || "chatterbox";

  useEffect(() => {
    bottom.current.scrollIntoView({behavior:"smooth"});
  }, [messages]);

  function submit(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    const text = msgText.current.value
    sendMessage({ uid, photoURL, text, roomID })
    msgText.current.value = "";
    if (text.toLowerCase().includes("@bot")) {
      Chatbot(text, (response) => {
        sendMessage({ text: response, uid: "chatbot", isBot: true, roomID });
      });
    }
  }

  async function sendMessage(msg) {
    await messagesCollection.add({ ...msg, createdAt: serverTimestamp() });
  }

  return (
      <div className="chatroom">
        <div className="messages">
          {messages && messages.map((msg,index) => <MessageBubble key={index} message={msg} />)}
          <div ref={bottom} style={mb}></div>
        </div>
        <div className="input">
          <form onSubmit={submit}>
            <input ref={msgText} type="text" required />
            <button type="submit">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M48 448l416-192L48 64v149.333L346 256 48 298.667z"></path></svg>
            </button>
          </form>
        </div>
        <div style={mb}></div>
      </div>
  );
}