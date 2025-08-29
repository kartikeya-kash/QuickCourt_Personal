import React, { useState, useEffect } from "react";
import Card from "./components/facilitycard";
import Loader from "./components/loader";

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
    <div>
      {Facilitydata.map((facility) => (
        <Card
          key={facility.id}
          name={facility.facilityName}
          location={facility.facilityLocation}
        />
      ))}
    </div>
  );
};

export default Facility;
