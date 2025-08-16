import React from "react";
import { useState } from "react";
import navigate from "react-router-dom";

function Home() {
  const navigate = useNavigate();

return (
  <div>
    <button onClick={()=>navigate("/Home")}>Home</button>
    <button>Facility</button>
    <button>My bookings</button>
    <button>Me</button>
    <h1>Welcome to the Home Page</h1>
    <p>This is the home page of our application.</p>
  </div>
  );

}

export default Home;