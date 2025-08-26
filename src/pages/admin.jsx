import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  const [role, setRole] = useState(undefined);
  const [addfacilitypop, setAddFacilitypop] = useState(false);

  useEffect(() => {
    if (username) {
      localStorage.setItem("adminusername", username);
    }
  }, [username]);

  const adminusernamefromlocal = localStorage.getItem("adminusername");

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

  const handleAddFacility = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // ✅ Collect all selected sports properly
    data.sports = formData.getAll("sports");

    // Also append adminusername
    data.adminusername = adminusernamefromlocal;

    try {
      const response = await fetch("http://localhost:5005/facility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // send as JSON
      });

      const resData = await response.json();
      alert(resData.message);

      if (response.ok) {
        alert("Facility sent for approval ✅");
      }
    } catch (error) {
      console.error("❌ Error adding new facility:", error);
      alert("Something went wrong. Please try again later.");
    }

    setAddFacilitypop(false);
  };

  return (
    <>
      <h1>Admin name = {adminusernamefromlocal}</h1>
      <p>
        Your facility (<span></span>)
      </p>
      {/* if admin clicks on facility → show info and bookings */}
      <div>{/* show approved facilities list here */}</div>
      <button onClick={addnewfacility}>Add new Facility</button> <br />
      <button>Check facility approve status</button> <br />
      <button onClick={logout}>Logout</button>
      {/* Facility Modal */}
      {addfacilitypop && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.76)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "rgba(72, 70, 70, 1)",
              padding: "20px",
              minWidth: "300px",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Add new facility</h2>
            <form style={{ textAlign: "center" }} onSubmit={handleAddFacility}>
              <div>
                <label>Facility ID:</label>
                <input type="text" name="facilityId" required />
              </div>
              <div>
                <label>Facility Name:</label>
                <input type="text" name="facilityName" required />
              </div>
              <div>
                <label>Facility Phone number:</label>
                <input type="text" name="facilityPhone" required />
              </div>
              <div>
                <label>Facility email:</label>
                <input type="email" name="facilityEmail" required />
              </div>
              <div>
                <label>Facility location:</label>
                <input type="text" name="facilityLocation" required />
              </div>
              <div>
                <label>Facility images:</label>
                <input type="file" name="facilityImages" multiple />
              </div>

              <div style={{ marginTop: "10px", marginLeft: "70px" }}>
                <label>Facility sport:</label>
                <br />
                <div
                  style={{
                    border: "1px solid gray",
                    width: "200px",
                    padding: "5px",
                    borderRadius: "20px",
                  }}
                >
                  <label>
                    <input type="checkbox" name="sports" value="Football" />{" "}
                    Football
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" name="sports" value="Cricket" />{" "}
                    Cricket
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" name="sports" value="Badminton" />{" "}
                    Badminton
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" name="sports" value="Tennis" />{" "}
                    Tennis
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" name="sports" value="Swimming" />{" "}
                    Swimming
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" name="sports" value="Gym" /> Gym
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" name="sports" value="Yoga" /> Yoga
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" name="sports" value="Basketball" />{" "}
                    Basketball
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" name="sports" value="Volleyball" />{" "}
                    Volleyball
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" name="sports" value="Table Tennis" />{" "}
                    Table Tennis
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" name="sports" value="Squash" />{" "}
                    Squash
                  </label>
                  <br />
                  <label>
                    <input type="checkbox" name="sports" value="Athletics" />{" "}
                    Athletics
                  </label>
                </div>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button type="submit">Add Facility</button>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button type="button" onClick={() => setAddFacilitypop(false)}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
