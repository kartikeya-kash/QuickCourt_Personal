import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const Admin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, password } = location.state || {};
    localStorage.setItem("adminusername", username);
    const adminusername = localStorage.getItem("username");
    const [role, setRole] = useState(undefined); 

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

  return (
        <>
            <h1>Admin name= {adminusername}</h1>
            <p>Your facility (<span></span>)</p>  {/*if admin click on one of the facility then all information and booking details must be shown*/}
            <div></div> {/*show all the facility which are aproved by the owner*/}
            <button>Add new Facility</button> <br />
            <button>check facility approve status</button> <br />
            <button onClick={logout}>logout</button>
        </>
    );
};

export default Admin;