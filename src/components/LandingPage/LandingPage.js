import "./LandingPage.css";
import { SignIn } from "../Auth";
import { useState, useEffect } from "react";
import logo from "../../images/logo1.png";
export default function LandingPage() {
  const [loading, setLoading] = useState("loading");
  useEffect(() => {
    setTimeout(() => {
      setLoading("");
    }, 500);
  });
  return (
    <div id="splash" className={loading}>
      <div className="card">
        <div className="card-body">
          <img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }}/>
          <h4>Sign in to ChatterBox</h4>
          <p>The global conversation</p>
          <div>
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}
