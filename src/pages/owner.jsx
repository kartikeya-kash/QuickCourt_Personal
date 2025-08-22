import React from "react";
import { useState } from "react";


const Owner = () => {
  const [addadmi, setAddAdmi] = useState(false);

const addadmin = () => {
  setAddAdmi(true);
};

  return (
    <div>

      <h1>Owner Dashboard</h1>
      <p>Total users = <span></span></p> <br />
      <p>Total bookings = <span></span></p><br />
      <p>Total Facility = <span></span></p><br />
      <p>Total Facility Requests = <span></span></p><br />

      <button onClick={addadmin}>Add admins</button><br />
      <button>View Facilitiy request</button><br />
      <button>Manage Facility</button><br />
      <button>View users</button><br />

      {addadmi && ( 
      <>
      <h1>Add Admin</h1>
      <form>
        <label>Username:</label>
        <input type="text" name="name" required /><br />
        <label>Email:</label>
        <input type="email" name="email" required /><br />
        <label>Password:</label>
        <input type="password" name="password" required /><br />
        <button type="submit">Add Admin</button>
      </form>
      <button onClick={() => setAddAdmi(false)}>Back to Dashboard</button>
      </>
    ) }
    
    </div>
  );
}

export default Owner;