import React from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

 const registerindb = (e) => {
    e.preventDefault();
    window.alert("Register button clicked");
    navigate("/login");
  }

  return (
    <div>
        <h1>Register Page</h1>
        <form>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" />
          </label>
          <br />
          <button type="submit" onClick={registerindb}>Register </button>
        </form>
        <button onClick={() => navigate("/login")}>Go to Login</button>
        <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
}

export default Register;