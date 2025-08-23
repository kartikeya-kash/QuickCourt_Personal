import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Owner from "./owner";

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

      if (data.role === "admin") {
        navigate("/admin");
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
        <label>
          Username:
          <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <button onClick={()=>{navigate("/register")}}>Dont have a account ? register now!</button>
    </div>
  );
}

export default Login;