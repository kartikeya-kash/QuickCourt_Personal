import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, password } = location.state || {};
    localStorage.setItem("adminusername", username);
    const adminusernamefromlocal = localStorage.getItem("adminusername");
    const [role, setRole] = useState(undefined); 
    const [addfacilitypop, setAddFacilitypop] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole ? storedRole : null);
  }, []);

  useEffect(() => {
    if (role !== undefined && role !== "admin") {
      navigate("/"); 
    }
  }, [role, navigate]);

  if (role === undefined) {
    return <p>Loading...</p>; 
  }

const logout = () => {
  localStorage.removeItem("adminusername");
  localStorage.removeItem("isloggedin");
  localStorage.removeItem("role");  
  navigate("/");
};

const addnewfacility = () => {
  setAddFacilitypop(true);
};

  return (
        <>
            <h1>Admin name= {adminusernamefromlocal}</h1>
            <p>Your facility (<span></span>)</p>  {/*if admin click on one of the facility then all information and booking details must be shown*/}
            <div></div> {/*show all the facility which are aproved by the owner*/}
            <button onClick={addnewfacility}>Add new Facility</button> <br />
            <button>check facility approve status</button> <br />
            <button onClick={logout}>logout</button>

       {addfacilitypop && (
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
      <h2 style={{ textAlign: "center" }} >Add new facility</h2>
      <form style={{ textAlign: "center" }}>
        <div>
          <label>Facility ID:</label>
          <input type="text" name="name" required/>
        </div>
        <div>
          <label>Facility Name:</label>
          <input type="text" name="name" required/>
        </div>
        <div>
          <label>Facility Phone number:</label>
          <input type="text" name="name" required/>
        </div>
        <div>
          <label>Facility email:</label>
          <input type="text" name="name" required/>
        </div>
        <div>
          <label>Facility location:</label>
          <input type="text" name="name" required/>
        </div>
        <div>
          <label>Facility images:</label>
          <input type="file" name="name" required/>
        </div>

        <div>
          <label>Facility sport:</label><br />
          <input type="checkbox" name="name" required/> Football 
          <input type="checkbox" name="name" required/> Cricket
          <input type="checkbox" name="name" required/> Badminton
          <input type="checkbox" name="name" required/> Tennis<br />
          <input type="checkbox" name="name" required/> Swimming
          <input type="checkbox" name="name" required/> Gym
          <input type="checkbox" name="name" required/> Yoga
          <input type="checkbox" name="name" required/> basketball<br />
          <input type="checkbox" name="name" required/> Volleyball
          <input type="checkbox" name="name" required/> Table Tennis
          <input type="checkbox" name="name" required/> Squash
          <input type="checkbox" name="name" required/> Athletics <br />
          <input type="checkbox" name="name" required/> Cycling
          <input type="checkbox" name="name" required/> sumoing
          <input type="checkbox" name="name" required/> Hiking
          <input type="checkbox" name="name" required/> Fishing<br />
          <input type="checkbox" name="name" required/> Climbing
          <input type="checkbox" name="name" required/> Surfing
          <input type="checkbox" name="name" required/> Skiing
          <input type="checkbox" name="name" required/> Snowboarding<br />
          <input type="checkbox" name="name" required/> Skating
          <input type="checkbox" name="name" required/> Martial Arts
          <input type="checkbox" name="name" required/> Dance
          <input type="checkbox" name="name" required/> Gymnastics<br />
          <input type="checkbox" name="name" required/> carting
          <input type="checkbox" name="name" required/> others
        </div>

        <div style={{ marginTop: "10px" }}>
          <button type="submit" >Add Facility</button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <button type="button" onClick={() => setAddFacilitypop(false)}>Close</button>
        </div>
      </form>
    </div>
  </div>
)}
        </>
    );
};

export default Admin;