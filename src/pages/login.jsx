import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [isloggedin , setisloggedin] = useState("");
const navigate = useNavigate();


const handellogin = (e) => {
    e.preventDefault();
    window.alert("Login button clicked");
    navigate("/"); // Redirect to home page after login
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
    </div>
  );
}

export default Login;