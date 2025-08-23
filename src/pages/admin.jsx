import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
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

  return (
        <>
            <h1>Admin</h1>
            <p>Your facility (total = <span></span>)</p>  {/*if admin click on one of the facility then all information and booking details must be shown*/}
            <div></div> {/*show all the facility which are aproved by the owner*/}
            <button>Add new Facility</button> <br />
            <button>check facility approve status</button>
        </>
    );
};

export default Admin;