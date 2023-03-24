import "./LandingPage.css"
import { SignIn } from '../Auth';
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [loading, setLoading] = useState("loading")
  useEffect(() => { setTimeout(() => { setLoading("") }, 500) } );
  return (
    <div id="splash" className={loading}>
      <div className="card">
        <div className="card-body">
          <h4>Welcome to ChatterBox</h4>
          <div><SignIn /></div>
        </div>
      </div>
    </div>
  );
}


