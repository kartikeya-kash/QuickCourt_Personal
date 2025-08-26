import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./components/input";
import Button from "./components/button";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handellogin = async (e) => {
    e.preventDefault();

    if (username === "owner" && password === "owner") {
      localStorage.setItem("role", "owner");
      localStorage.setItem("isloggedin", true);
      navigate("/owner");
      return;
    }

    try {
      const response = await fetch("http://localhost:5005/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("role", data.role);
        localStorage.setItem("isloggedin", true);
        localStorage.setItem("username", username);

        if (data.role === "admin") {
          navigate("/admin", { state: { username, password } }); //send username and password to admin page
        } else {
          navigate("/"); // normal user home
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong, try again!");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handellogin}>
        <Input
          type="text"
          name="username"
          label="Username"
          value={username}
          onChange={setUsername}
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
        <Button text="Login" onClick={handellogin} />
      </form>
      <Button text="Register" onClick={() => navigate("/register")} />
    </div>
  );
}

export default Login;
