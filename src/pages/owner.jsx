import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Owner = () => {
  const navigate = useNavigate();
  const [addadmi, setAddAdmi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminusername, setadminusername] =useState("");
  const [adminemail, setadminemail] =useState("");
  const [adminpassword, setadminpassword] =useState("");

const isowner = localStorage.getItem("role");
  
 

  useEffect(() => { //this will run when the page render 
  if (isowner!="owner") {
  navigate("/");    
} else {
  setLoading(false); 
}
}, [isowner, navigate]);  //If you put some variables inside (like [isloggedIn, isowner, navigate]):
                                      // → It runs the effect every time one of those variables changes.

  if(loading){
  return (<h2>Checking access...</h2>);
}

const addadmin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5005/adminregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminusername, adminemail, adminpassword }),
      });

      const data = await response.json();
      alert(data.message);

     if(response.ok){
       setadminusername("");
      setadminemail("");
      setadminpassword("");
      setAddAdmi(false);
     }

    } catch (error) {
      console.error("❌ Error during adding admin:", error);
      alert("Something went wrong. Please try again later.");
    }
  };


  const logout = ()=> {
    localStorage.removeItem("isloggedin");
    localStorage.removeItem("role");
    navigate("/");
  }


  return (
    <div>
      <h1>Owner Dashboard</h1>
      <p>Total Admin = <span></span></p> <br />
      <p>Total users = <span></span></p> <br />
      <p>Total bookings = <span></span></p><br />
      <p>Total Facility = <span></span></p><br />
      <p>Total Facility Requests = <span></span></p><br />

      <button onClick={() => setAddAdmi(true)}>Add admins</button><br />
      <button>View Facility request</button><br />
      <button>Manage Facility</button><br />
      <button>Manage admins</button><br />
      <button>View users</button><br />
      <button onClick={logout}>Logout</button>
      

     
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
      <h1 style={{ textAlign: "center" }} >Add Admin</h1>
      <form style={{ textAlign: "center" }}>
        <div>
          <label>Admin Username:</label><br />
          <input type="text" name="name" required value={adminusername} onChange={(e)=> setadminusername(e.target.value)}/>
        </div>
        <div>
          <label>Admin Email:</label><br />
          <input type="email" name="email" required value={adminemail} onChange={(e)=> setadminemail(e.target.value)}/>
        </div>
        <div>
          <label>Admin Password:</label><br />
          <input type="password" name="password" required value={adminpassword} onChange={(e)=> setadminpassword(e.target.value)}/>
        </div>

        <div style={{ marginTop: "10px" }}>
          <button type="submit" onClick={addadmin}>Add Admin</button>
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