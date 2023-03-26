// Hooks
import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Components
import { SignIn, SignOut } from './components/Auth'
import ChatRoom from './components/ChatRoom/ChatRoom';
import LandingPage from './components/LandingPage/LandingPage'

// import ModalInput from "./components/ModalInput/ModalInput"

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
        {user 
          ? (<>
              <header>
                <div className="app-header">
                  <p>{window.location.href.includes("?") && <a href="/" style={{color:"inherit", textDecoration:"none", padding:"0 5px 0 15px"}}>◀</a>}</p>
                  <h1> ChatterBox</h1>
                  {/* style={{position:"absolute", top:"47%", transform:"translateY(-50%)", right:"20px"}} */}
                  {/* <ModalInput
                    title="Chatterbox"
                    prompt="Enter the name of the room to join/create"
                    placeholder="Room name"
                    icon={<img style={{borderRadius:"50%", height:"40px", cursor:"pointer"}} src={auth.currentUser.photoURL} alt="avatar" />}
                  /> */}
                  <SignIn /><SignOut />
                </div>
              </header>
              <section>
                <ChatRoom />
              </section>
            </>)
          : <LandingPage />}
      </FirebaseContext.Provider>
    </div>
  );
}

export const FirebaseContext = createContext(null);
