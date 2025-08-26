import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./components/button";
import Input from "./components/input";

function Home() {
  const navigate = useNavigate();
  const isloggedIn = JSON.parse(localStorage.getItem("isloggedin") || "false");

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
          <h1>Welcome user</h1>
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
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <Button text="Login" onClick={() => navigate("/login")} />
            <Button text="Register" onClick={() => navigate("/register")} />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Button text="Home" onClick={() => navigate("/")} />
            <Button text="Facilities" onClick={() => navigate("/facility")} />
            <Button
              text="My Bookings"
              onClick={() => alert("Login to access this feature")}
            />
            <Button
              text="Me"
              onClick={() => alert("Login to access this feature")}
            />
          </div>
        </div>
      )}

      <h1>Welcome to QuickCourt Home page</h1>
      <p>Your one-stop solution for court management.</p>
    </div>
  );
}

export default Home;
