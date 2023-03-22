// Hooks
import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Components
import { SignIn, SignOut } from './components/Auth'
import ChatRoom from './components/ChatRoom';

// Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

  firebase.initializeApp({
    apiKey: "AIzaSyCOoDndVcD7kYKzQ1NKHdwd4P9208tjD0U",
    authDomain: "chatterboxtest-606f1.firebaseapp.com",
    projectId: "chatterboxtest-606f1",
    storageBucket: "chatterboxtest-606f1.appspot.com",
    messagingSenderId: "366240479774",
    appId: "1:366240479774:web:5f6a4fb9ec6fac70f10c0f",
    measurementId: "G-BECLPZ5CWK"
  })
  // firebase.initializeApp({
  //   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  //   authDomain: process.env.REACT_APP_AUTHDOMAIN,
  //   projectId: process.env.REACT_APP_PROJECT_ID,
  //   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  //   messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  //   appId: process.env.REACT_APP_APP_ID
  // })


const auth = firebase.auth();
const firestore = firebase.firestore();

export default function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <FirebaseContext.Provider value={{ firebase, auth, firestore }}>
        <header className="">
          <h1>ChatterBox</h1>
          <SignIn /><SignOut />
        </header>
        <section>
          {user ? <><ChatRoom /></> : <></>}
        </section>
      </FirebaseContext.Provider>
    </div>
  );
}

export const FirebaseContext = createContext(null);
