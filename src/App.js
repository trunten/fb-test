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
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
})


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
