import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const registerindb = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5005/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }), 
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      navigate("/login");
    }
  } catch (error) {
    console.error("❌ Error during registration:", error);
    alert("Something went wrong. Please try again later." , error);
  }
};

  return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={registerindb}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>

      <button onClick={() => navigate("/login")}>Go to Login</button>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
}

export default Register;