import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isloggedIn = JSON.parse(localStorage.getItem("isloggedin") || "false");

  const logout = ()=>{
      localStorage.removeItem("isloggedin");
      localStorage.removeItem("role"); 
      localStorage.removeItem("username");
      navigate("/");
  }



  return (
    <div>
      {isloggedIn ? (
        <div>
          <h1>Welcome user</h1>
          <button onClick={()=>navigate("")}>Home</button>
          <button onClick={()=>navigate("/facility")}>Facilities</button>
          <button onClick={()=>navigate("/mybookings")}>My Bookings</button>
          <button onClick={()=>navigate("/me")}>Me</button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={()=>navigate("/login")}>Login</button>
          <button onClick={()=>navigate("/register")}>Register</button>
          <br />
          <button onClick={()=>navigate("/")}>Home</button>
          <button onClick={()=>navigate("/facility")}>Facilities</button>
          <button onClick={()=>alert("Login to access this feature")}>My Bookings</button>
          <button onClick={()=>alert("Login to access this feature")}>Me</button>
        </div>
      )}

      <h1>Welcome to QuickCourt Home page</h1>
      <p>Your one-stop solution for court management.</p>
    </div>
  );
}

export default Home;