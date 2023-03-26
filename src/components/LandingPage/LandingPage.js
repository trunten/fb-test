import "./LandingPage.css";
import { SignIn } from "../Auth";
import { useState, useEffect, useRef } from "react";
import chatIcon from "../../images/chat.png";

export default function LandingPage() {
  const [loading, setLoading] = useState("loading");
  const imgRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading("");
    }, 500);
  }, []);

  const handleMouseEnter = () => {
    imgRef.current.classList.add("glow");
  };

  const handleMouseLeave = () => {
    imgRef.current.classList.remove("glow");
  };

  return (
    <div id="splash" className={loading}>
      <div className="gradient-overlay"></div>
      <div className="card">
        <div className="card-body">
          <div
            className="img-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={chatIcon}
              alt="chat icon"
              className="chat-icon"
              ref={imgRef}
            />
          </div>
          <h4>Welcome to ChatterBox</h4>
          <div>
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
