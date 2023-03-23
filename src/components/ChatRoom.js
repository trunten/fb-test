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
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import AddIcon from "@mui/icons-material/Add";
import AtIcon from "@mui/icons-material/AlternateEmail";
import EmojiIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import TextIcon from "@mui/icons-material/TextFormat";
import MicNoneIcon from "@mui/icons-material/MicNone";

const mb = { marginBottom: "10px" };

export default function ChatRoom({ roomID }) {
  const {auth, firestore } = useContext(FirebaseContext)
  const messagesCollection = firestore.collection("messages");
  const query = messagesCollection.orderBy("createdAt").limitToLast(100);
  const [messages] = useCollectionData(query, { idField: "id" });
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
        console.log(response);
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
          <div className="toolbar">
            <IconButton>
              <AddIcon />
            </IconButton>
            <IconButton>
              <EmojiIcon />
            </IconButton>
            <IconButton>
              <AtIcon />
            </IconButton>
            <IconButton>
              <TextIcon />
            </IconButton>
            <IconButton>
              <MicNoneIcon />
            </IconButton>
            {/* <IconButton
              className="submit__button"
              type="submit"
              onClick={props.onMessageSubmit}
            >
              <SendIcon />
            </IconButton> */}
          </div>
        </div>
        <div style={mb}></div>
      </div>
  );
}