import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./components/button";

function Me() {
  const navigate = useNavigate();
  const isloggedIn = localStorage.getItem("isloggedin") || false;
  const username = localStorage.getItem("username") || "";

  const logout = () => {
    localStorage.removeItem("isloggedin");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div>
      {isloggedIn ? (
        <div>
          <h1>Welcome {username}</h1>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button text="Home" onClick={() => navigate("/")} />
            <Button text="Facilities" onClick={() => navigate("/facility")} />
            <Button
              text="My Bookings"
              onClick={() => navigate("/mybookings")}
            />
            <Button text="Me" onClick={() => navigate("/me")} />
            <Button text="Logout" onClick={logout} color="red" />
          </div>
        </div>
      ) : (
        <div>
          <h1>Please log in to view your profile.</h1>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      )}
    </div>
  );
}

export default Me;
