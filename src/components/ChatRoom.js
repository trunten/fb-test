// Glocal state
import { useContext } from "react";
import { FirebaseContext } from "../App";

// Hooks
import { useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { serverTimestamp } from "firebase/firestore";

// Components
import MessageBubble from "./MessageBubble/MessageBubble";
import { Chatbot, WeatherBot } from "./Chatbot";
import { BiBot } from "react-icons/bi";
import { SiWindows11 } from "react-icons/si";

const mb = { marginBottom: "10px" };

export default function ChatRoom() {
  const { auth, firestore } = useContext(FirebaseContext);
  const messagesCollection = firestore.collection("messages");
  const query = messagesCollection.orderBy("createdAt").limitToLast(100);
  const [messages] = useCollectionData(query, { idField: "id" });
  const msgText = useRef(0);
  const bottom = useRef(0);
  const roomID =
    new URLSearchParams(document.location.search).get("roomid") || "chatterbox";

  function submit(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    const text = msgText.current.value;
    sendMessage({ uid, photoURL, text, roomID });
    msgText.current.value = "";
    if (text.toLowerCase().includes("@bot")) {
      Chatbot(text, (response) => {
        // console.log(response);
        sendMessage({ text: response, uid: "chatbot", isBot: true, roomID });
      });
    } else if (text.toLowerCase().includes("@weather")) {
      WeatherBot().then((weather) => {
        sendMessage({
          text: `${weather.temp}°C, ${weather.conditions}`,
          uid: "chatbot",
          isBot: true,
          roomID,
        });
      });
    }
  }

  async function sendMessage(msg) {
    await messagesCollection.add({ ...msg, createdAt: serverTimestamp() });
  }

  return (
    <div
      style={{
        height: "100vh",
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      <div className="chatroom">
        <div className="messages">
          {messages &&
            messages.map(
              (msg, index) =>
                msg.roomID === roomID && (
                  <MessageBubble key={index} message={msg} />
                )
            )}
          <div ref={bottom} style={mb}></div>
        </div>
        <div className="input">
          <div>
            <BiBot className="breakout-icon" />
            <SiWindows11 className="breakout-icon" />
          </div>
          <form onSubmit={submit}>
            <input ref={msgText} type="text" required />
            <button type="submit">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M48 448l416-192L48 64v149.333L346 256 48 298.667z"></path>
              </svg>
            </button>
          </form>
        </div>
        <div style={mb}></div>
      </div>
    </div>
  );
}
