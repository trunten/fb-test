import "./LandingPage.css";
import { SignIn } from "../Auth";

import chatIcon from "../../images/chat.png";

export default function LandingPage() {
  return (
    <div id="splash">
      <div className="gradient-overlay"></div>
      <div className="card">
        <div className="card-body">
          <div className="img-container">
            <img src={chatIcon} alt="chat icon" className="chat-icon" />
          </div>
          <p className="intro-span">Welcome to</p>
          <h4> ChatterBox</h4>
          <div>
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
