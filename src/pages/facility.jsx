import React, { useState, useEffect } from "react";
import Card from "./components/facilitycard";
import Loader from "./components/loader";
import styled from "styled-components";

const Facility = () => {
  const [Facilitydata, setFacilitydata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5005/facilitylistforusers")
      .then((res) => res.json())
      .then((data) => {
        setFacilitydata(data);
        console.log("✅ Fetched facilities:", data);
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
    <GridWrapper>
      {Facilitydata.map((facility) => (
        <Card
          key={facility.id}
          name={facility.facilityName}
          location={facility.facilityLocation}
        />
      ))}
    </GridWrapper>
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
