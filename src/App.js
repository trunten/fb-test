import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { serverTimestamp } from 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCJgHol-1pbIB50efAeX_noBkvxl2DnF_w",
  authDomain: "fir-test-5b807.firebaseapp.com",
  projectId: "fir-test-5b807",
  storageBucket: "fir-test-5b807.appspot.com",
  messagingSenderId: "686866407483",
  appId: "1:686866407483:web:a46e67bdc854944aedbc1e"
})

const mb = {marginBottom:"10px"};
const auth = firebase.auth();
const appFirestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="">
        <h1>ChatterBox</h1>
        <SignOut />
      </header>
      <section>
        {user ? <><ChatRoom /></> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle} style={mb}>Sign In</button>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()} style={mb}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesCollection = appFirestore.collection("messages");
  const query = messagesCollection.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, {idField: "id"});
  const [formValue, setFormValue] = useState("");
  const msgText = useRef(0);
  const bottom = useRef(0); 

  const sendMessage = async(e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await messagesCollection.add({
      text: formValue,
      createdAt: serverTimestamp(),
      uid, 
      photoURL
    });
    setFormValue("");
    bottom.current.scrollIntoView({behavior:"smooth"})
    // console.log(msgText.current);
  }

  return (
      <div className="chatroom">
        <div className="messages">
          {messages && messages.map((msg,index) => <ChatMessage key={index} message={msg} />)}
          <div ref={bottom} style={mb}></div>
        </div>
        <div>
          <form onSubmit={sendMessage}>
            <input ref={msgText} type="text" value={formValue} required onChange={(e) => setFormValue(e.target.value)} />
            <button type="submit">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M48 448l416-192L48 64v149.333L346 256 48 298.667z"></path></svg>
            </button>
          </form>
        </div>
        <div style={mb}></div>
      </div>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const className = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${className}`}>
      <img src={photoURL} alt="avatar" />
      <p>{text}</p>
    </div>
  )
}

export default App;
