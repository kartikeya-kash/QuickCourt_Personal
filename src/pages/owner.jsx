import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Owner = () => {
  const navigate = useNavigate();
  const [addadmi, setAddAdmi] = useState(false);
  const isloggedIn = JSON.parse(localStorage.getItem("isloggedin"));
  const isowner = JSON.parse(localStorage.getItem("owner") );

   useEffect(() => { //this will run when the page render 
  if (isloggedIn) {
    navigate("/");
  } else if (!isowner) {
    navigate("/");
  }
}, [isloggedIn, isowner, navigate]); 

  return (
    <div>
      <h1>Owner Dashboard</h1>
      <p>Total users = <span></span></p> <br />
      <p>Total bookings = <span></span></p><br />
      <p>Total Facility = <span></span></p><br />
      <p>Total Facility Requests = <span></span></p><br />

      <button onClick={() => setAddAdmi(true)}>Add admins</button><br />
      <button>View Facility request</button><br />
      <button>Manage Facility</button><br />
      <button>View users</button><br />

     
{addadmi && (
  <div style={{
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    background: "rgba(0, 0, 0, 0.76)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}>
    <div style={{ background: "rgba(72, 70, 70, 1)", padding: "20px", minWidth: "300px" }}>
      <h1 style={{ textAlign: "center" }}>Add Admin</h1>
      <form style={{ textAlign: "center" }}>
        <div>
          <label>Admin Username:</label><br />
          <input type="text" name="name" required />
        </div>
        <div>
          <label>Admin Email:</label><br />
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Admin Password:</label><br />
          <input type="password" name="password" required />
        </div>

        <div style={{ marginTop: "10px" }}>
          <button type="submit">Add Admin</button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button type="button" onClick={() => setAddAdmi(false)}>Close</button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default Owner;