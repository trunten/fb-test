import "./LandingPage.css"
import { SignIn } from '../Auth';

export default function LandingPage() {
  return (
    <div id="splash">
      <div className="card">
        <div className="card-body">
          <h4>Welcome to ChatterBox</h4>
          <div><SignIn /></div>
        </div>
      </div>
    </div>
  );
}


