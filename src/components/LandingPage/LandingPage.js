import "./LandingPage.css";
import { SignIn } from "../Auth";
<<<<<<< HEAD
import { useState, useEffect } from "react";
import logo from "../../images/logo1.png";
export default function LandingPage() {
  const [loading, setLoading] = useState("loading");
  useEffect(() => {
    setTimeout(() => {
      setLoading("");
    }, 500);
  });
=======

import chatIcon from "../../images/chat.png";

export default function LandingPage() {
>>>>>>> c3d06e99c5fdde7c66e15eb40367c69853683ce6
  return (
    <div id="splash">
      <div className="gradient-overlay"></div>
      <div className="card">
        <div className="card-body">
<<<<<<< HEAD
          <img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }}/>
          <h4>Sign in to ChatterBox</h4>
          <p>The global conversation</p>
=======
          <div className="img-container">
            <img src={chatIcon} alt="chat icon" className="chat-icon" />
          </div>
          <p className="intro-span">Welcome to</p>
          <h4> ChatterBox</h4>
>>>>>>> c3d06e99c5fdde7c66e15eb40367c69853683ce6
          <div>
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
