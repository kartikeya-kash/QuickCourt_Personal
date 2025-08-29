import React, { useState, useEffect } from "react";
import Card from "./components/facilitycard";
import Loader from "./components/loader";
import styled from "styled-components";
import Button from "./components/button";
import { useNavigate } from "react-router-dom";

const Facility = () => {
  const navigate = useNavigate();
  const [Facilitydata, setFacilitydata] = useState([]);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("isloggedin");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    fetch("http://localhost:5005/facilitylistforusers")
      .then((res) => res.json())
      .then((data) => {
        setFacilitydata(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching facilities:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <Button text="Home" onClick={() => navigate("/")} />
        <Button text="Facilities" onClick={() => navigate("/facility")} />
        <Button text="My Bookings" onClick={() => navigate("/mybookings")} />
        <Button text="Me" onClick={() => navigate("/me")} />
        <Button text="Logout" onClick={logout} color="red" />
      </div>
      <h1 style={{ textAlign: "center" }}>Facility Page</h1>
      <GridWrapper>
        {Facilitydata.map((facility) => (
          <Card
            key={facility.id}
            name={facility.facilityName}
            location={facility.facilityLocation}
          />
        ))}
      </GridWrapper>
    </>
  );
};

export default Facility;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center; /* center cards in their grid cell */
`;
