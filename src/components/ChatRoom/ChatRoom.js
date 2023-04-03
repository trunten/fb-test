// Global state
import { useContext } from "react";
import { FirebaseContext } from "../../App";

// Hooks
import { useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { serverTimestamp } from "firebase/firestore";

// Components
import MessageBubble from "../MessageBubble/MessageBubble";
import { Chatbot, WeatherBot } from "../Chatbot";
import ModalInput from "../ModalInput/ModalInput";
import { toast } from "react-toastify";

// CSS
import "./ChatRoom.css"
import "react-toastify/dist/ReactToastify.css";

const mb = { marginBottom: "10px" };

export default function ChatRoom() {
  const roomID = (new URLSearchParams(document.location.search).get("roomid") || "chatterbox").toLowerCase();
  const { auth, firestore } = useContext(FirebaseContext);
  const messagesCollection = firestore.collection("messages");
  const query = messagesCollection.where("roomID", "==", roomID).orderBy("createdAt").limitToLast(300);
  const [messages] = useCollectionData(query, { idField: "id" });
  const msgText = useRef(0);
  const bottom = useRef(0);

  function formSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const { uid, photoURL, displayName } = auth.currentUser;
    const text = msgText.current.value;
    sendMessage({ uid, photoURL, text, roomID, displayName });
    msgText.current.value = "";
    if (text.toLowerCase().includes("@bot")) {
      Chatbot(text, (response) => {
        sendMessage({ text: response, uid: "chatbot", isBot: true, roomID });
      });
    } else if (text.toLowerCase().includes("@weather")) {
      WeatherBot().then((weather) => {
        sendMessage({
          text: `${weather.temp}°C, ${weather.conditions}`,
          uid: "chatbot",
          isBot: true,
          roomID,
          icon: weather.icon
        });
      });
    }
  }

  function botInfo() {
    toast.info(
      "Chatbot usage: @weather gets the current weather. Adding @bot before your message talks to the chatbot directly (e.g: @bot how many months do we have in a calender year?)",
      {
        position: "bottom-left",
        autoClose: 7000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        bodyClassName: "custom-body-class",
      }
    );
  }

  function changeRoom(room) {
    if (!room || !room.trim) {
      return;
    }
    room = room.trim().replace(/\s/g, "_");
    if (room.length === 0) {
      return;
    }
    const url = window.location.href.split("?")[0] + "?roomid=" + room;
    window.location.href = url;
  }

  async function sendMessage(msg) {
    await messagesCollection.add({ ...msg, createdAt: serverTimestamp() });
  }

  // Alternative messag send that gets base64 of user avatar.
  // function sendMessage(msg) {
  //   fetch(msg.photoURL).then(res => res.blob()).then(blob => {
  //     const fr = new FileReader();
  //     fr.readAsDataURL(blob); 
  //     fr.onloadend = () => {
  //       const img = fr.result;
  //       messagesCollection.add({ ...msg, createdAt: serverTimestamp(), img })
  //     }
  //   });

  return (
    <div id="chat-container"
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
          <form onSubmit={formSubmit} >
            <svg
              onClick={botInfo}
              className="icon-button bot"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 10 640 512"
              height="1.5em"
              width="1.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z"></path>
            </svg>
            <ModalInput
              title="Breakout Room"
              prompt="Enter the name of the room to join/create"
              placeholder="Room name"
              modalSubmit={changeRoom}
            />
            <div className="form-group">
              <input ref={msgText} type="text" placeholder="Message" required />
              <button type="submit" className="no-style-btn">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z"></path></svg>
              </button>
            </div>
          </form>
        </div>
        <div style={mb}></div>
      </div>
    </div>
  );
}
