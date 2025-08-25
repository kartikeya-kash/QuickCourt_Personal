import React from "react";
import { useNavigate } from "react-router-dom";

function Me() {
  const navigate = useNavigate();
  const isloggedIn = (localStorage.getItem("isloggedin") || false);
  const username = localStorage.getItem("username") || "";
  

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
          <h1>Welcome {username}</h1>
          <button onClick={()=>navigate("")}>Home</button>
          <button onClick={()=>navigate("/facility")}>Facilities</button>
          <button onClick={()=>navigate("/mybookings")}>My Bookings</button>
          <button onClick={()=>navigate("/me")}>Me</button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Please log in to view your profile.</h1>
          <button onClick={()=>navigate("/login")}>Login</button>
          <button onClick={()=>navigate("/register")}>Register</button>
        </div>
      )}
    </div>
  );
}

export default Me;