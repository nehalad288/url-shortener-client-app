import { useState } from "react";

interface SignupModalProps {
  onClose: () => void;
  onSignupSuccess: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ onClose, onSignupSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Signup failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      onSignupSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Sign Up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button className="modal-button" onClick={handleSignup}>Sign Up</button>
        <button className="modal-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
