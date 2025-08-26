import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./components/input";
import Button from "./components/button";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("");
  const navigate = useNavigate();

  const usrn = (value) => {
    setUsername(value);
    usrnamecheck(value);
  };

  const usrnamecheck = async (name) => {
    if (!name.trim()) {
      setUsernameStatus("");
      return;
    }

    try {
      const response = await fetch("http://localhost:5005/usernamecheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name }),
      });

      const data = await response.json();
      if (data.exists) {
        setUsernameStatus("❌ Username already exists");
      } else {
        setUsernameStatus("✅ Username available");
      }
    } catch (error) {
      console.error("❌ Error checking username:", error);
      setUsernameStatus("⚠️ Could not check username");
    }
  };

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
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Register Page</h1>

      <div style={{ marginTop: "20px" }}>
        <form onSubmit={registerindb}>
          <Input
            type="text"
            name="username"
            label="Username"
            value={username}
            onChange={usrn}
          />
          <span
            style={{
              marginLeft: "10px",
              color: usernameStatus.startsWith("✅") ? "green" : "red",
            }}
          >
            {usernameStatus}
          </span>

          <br />

          <Input
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={setEmail}
          />
          <br />

          <Input
            type="password"
            name="password"
            label="Password"
            value={password}
            onChange={setPassword}
          />
          <br />
        </form>
        <Button text="Register" onClick={registerindb} />
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <Button text="Login" onClick={() => navigate("/login")} />
        <Button text="Home" onClick={() => navigate("/")} />
      </div>
    </div>
  );
}

export default Register;
