import "./App.css";
import { Form, User } from "./components/Form";
import { useState } from "react";
import { LoginModal } from "../src/components/LoginModal";
import { SignupModal } from "../src/components/SignupModal";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [user, setUser] = useState<User>();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };
  const title = `Welcome ${user?.name}`
  return (
    <div>
      <header className="header">
        {loggedIn ? (
          <div className="header-content">
            <div className="title">{title}</div>
            <button className="header-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
          <div className="header-content">
            <button className="header-button" onClick={() => setShowLogin(true)}>Login</button>
            <button className="header-button" onClick={() => setShowSignup(true)}>Sign Up</button>
          </div>
          </>
        )}
      </header>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={(user) => {
            setLoggedIn(true);
            setUser(user);
          }}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSignupSuccess={() => setLoggedIn(false)}
        />
      )}

      {loggedIn && user ? (
        <div>
          <Form user={user} />
          <Dashboard user={user}/>
        </div>
      ) : (
        <div>
          <div className="landing-page">URL Shortener App</div>
          <p>Please log in or sign up to shorten and view URLs.</p>
        </div>
        
      )}
    </div>
  );
}

export default App;
