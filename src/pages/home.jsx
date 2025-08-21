import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isloggedIn = JSON.parse(localStorage.getItem("isloggedin") || "false");

  const nav = (route) => {
    if (route === "login") return () => navigate("/login");
    if (route === "register") return () => navigate("/register");
    if (route === "home") return () => navigate("/");
    if (route === "restrictedBookings" || route === "restrictedMe") return () => {
      alert("Login to access this feature");
      navigate("/login");
    };
  };

  return (
    <div>
      {isloggedIn ? (
        <div>
          <h1>Welcome user</h1>
          <button onClick={nav("home")}>Home</button>
          <button>Facilities</button>
          <button>My Bookings</button>
          <button>Me</button>
          <button onClick={() => {localStorage.removeItem("isloggedin");navigate("/");}}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={nav("login")}>Login</button>
          <button onClick={nav("register")}>Register</button>
          <br />
          <button onClick={nav("home")}>Home</button>
          <button>Facilities</button>
          <button onClick={nav("restrictedBookings")}>My Bookings</button>
          <button onClick={nav("restrictedMe")}>Me</button>
        </div>
      )}

      <h1>Welcome to QuickCourt Home page</h1>
      <p>Your one-stop solution for court management.</p>
    </div>
  );
}

export default Home;