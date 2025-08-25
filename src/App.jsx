import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Owner from "./pages/owner"; 
import Admin from "./pages/admin";
import Facility from "./pages/facility";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/owner" element={<Owner />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/facility" element={<Facility />} />
      {/* Add more routes as needed */}

    </Routes>
  );
}

export default App;