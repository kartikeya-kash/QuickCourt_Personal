import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(undefined); 

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole ? JSON.parse(storedRole) : null);
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
  <h1>Admin</h1>
);
};

export default Admin;