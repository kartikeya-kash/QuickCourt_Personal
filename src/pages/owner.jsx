import React from "react";
import { useState } from "react";


const Owner = () => {
  return (
    <div>
      <h1>Owner Dashboard</h1>


      <p>Total users = <span></span></p> <br />
      <p>Total bookings = <span></span></p><br />
      <p>Total Facility = <span></span></p><br />
      <p>Total Facility Requests = <span></span></p><br />

      <button>Add admins</button><br />
      <button>View Facilitiy request</button><br />
      <button>Manage Facility</button><br />
      <button>View users</button><br />
    </div>
  );
}

export default Owner;