// Global state
import { useContext } from "react";
import { FirebaseContext } from "../App";

const mb = {marginBottom:"10px"};

export function SignIn() {
  const {auth, firebase } = useContext(FirebaseContext)
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return !auth.currentUser && (
    <button onClick={signInWithGoogle} style={mb}>Sign In</button>
  );
}

export function SignOut() {
  const { auth } = useContext(FirebaseContext)

  return auth.currentUser && (
    <button onClick={() => auth.signOut()} style={mb}>Sign Out</button>
  )
}