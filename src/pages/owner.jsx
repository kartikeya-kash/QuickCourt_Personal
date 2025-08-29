import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./components/loader";

const Owner = () => {
  const navigate = useNavigate();
  const [addadmi, setAddAdmi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminusername, setadminusername] = useState("");
  const [adminemail, setadminemail] = useState("");
  const [adminpassword, setadminpassword] = useState("");
  const [pageloaded, setPageLoaded] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  // For viewing facility requests
  const [viewfacilityrequestpopup, setViewFacilityRequestPopup] =
    useState(false);
  const [facilityrequestsdata, setFacilityRequestsData] = useState([]);

  // For viewing users
  const [viewuserspopup, setViewUsersPopup] = useState(false);
  const [usersdata, setUsersData] = useState([]);

  const isowner = localStorage.getItem("role");

  useEffect(() => {
    //this will run when the page render
    if (isowner != "owner") {
      navigate("/");
    } else {
      setLoading(false);
    }

    const getuserata = async () => {
      try {
        setUsersLoading(true); // show loader
        const response = await fetch(`http://localhost:5005/showallusers`);
        const data = await response.json();

        // ⏳ add 2 second delay before updating UI
        setTimeout(() => {
          setUsersData(data);
          setUsersLoading(false); // hide loader after delay
        }, 200);
      } catch (error) {
        console.error("Error fetching users data:", error);
        alert("Failed to fetch users data. Please try again later.");
        setUsersLoading(false);
      }
    };

    if (viewuserspopup || pageloaded) {
      getuserata();
      setPageLoaded(false);
    }
  }, [isowner, navigate, viewuserspopup]); //If you put some variables inside (like [isloggedIn, isowner, navigate]):
  // → It runs the effect every time one of those variables changes.

  //loading screen
  if (loading) {
    return <h2>Checking access...</h2>;
  }

  //add admin function
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

      if (response.ok) {
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

  //logout function
  const logout = () => {
    localStorage.removeItem("isloggedin");
    localStorage.removeItem("role");
    navigate("/");
  };

  //view users pop up
  const showviewuserspopup = async () => {
    setViewUsersPopup(true);
  };

  //view facility request
  const viewfacilityrequest = async () => {
    setViewFacilityRequestPopup(true);
    try {
      const response = await fetch(`http://localhost:5005/facilityrequests`);
      const data = await response.json();
      setFacilityRequestsData(data);
    } catch (error) {
      console.error("Error fetching users data:", error);
      alert("Failed to fetch users data. Please try again later.");
      setUsersLoading(false);
    }
  };

  //accept or reject facility request
  const faclityyesno = (id, status) => async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5005/facilityrequestapprove",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status }), // send both id + status
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Facility request updated:", data);

      alert(
        `Facility request ${
          status === "yes" ? "approved" : "rejected"
        } successfully!`
      );
      viewfacilityrequest(); // Refresh the list after update
    } catch (error) {
      console.error("❌ Error during facility request update:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      {/*view users pop up*/}
      {usersLoading ? (
        <Loader />
      ) : (
        viewuserspopup && (
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
              }}
            >
              <h1 style={{ textAlign: "center" }}>All Users</h1>
              <div>
                {/* Fetch and display users here */}
                <ul>
                  {usersdata.map((f) => (
                    <p key={f.id}>
                      ID:{f.id}, Name:{f.username}, Email ID:
                      <strong>{f.email}</strong>
                    </p>
                  ))}
                </ul>
                <div style={{ marginTop: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setViewUsersPopup(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* Add Admin Pop Up */}
      {addadmi && (
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
            }}
          >
            <h1 style={{ textAlign: "center" }}>Add Admin</h1>
            <form style={{ textAlign: "center" }}>
              <div>
                <label>Admin Username:</label>
                <br />
                <input
                  type="text"
                  name="name"
                  required
                  value={adminusername}
                  onChange={(e) => setadminusername(e.target.value)}
                />
              </div>
              <div>
                <label>Admin Email:</label>
                <br />
                <input
                  type="email"
                  name="email"
                  required
                  value={adminemail}
                  onChange={(e) => setadminemail(e.target.value)}
                />
              </div>
              <div>
                <label>Admin Password:</label>
                <br />
                <input
                  type="password"
                  name="password"
                  required
                  value={adminpassword}
                  onChange={(e) => setadminpassword(e.target.value)}
                />
              </div>

              <div style={{ marginTop: "10px" }}>
                <button type="submit" onClick={addadmin}>
                  Add Admin
                </button>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button type="button" onClick={() => setAddAdmi(false)}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*View all facilty req*/}
      {viewfacilityrequestpopup && (
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
              width: "500px", // fixed width
              maxHeight: "70vh", // fixed max height relative to screen
              overflowY: "auto", // scroll inside
              borderRadius: "10px",
            }}
          >
            <h1 style={{ textAlign: "center" }}>Facility Requests</h1>
            <div>
              {/* Fetch and display facility requests here */}
              <ul style={{ padding: 0 }}>
                {facilityrequestsdata.map((frd) => (
                  <p key={frd.id}>
                    {frd.id}. Admin: {frd.adminusername}, ID: {frd.facilityId},
                    Name: {frd.facilityName}, Phone: {frd.facilityPhone}, Email:{" "}
                    {frd.facilityEmail}, Location: {frd.facilityLocation},
                    Sports:{" "}
                    {Array.isArray(frd.sports)
                      ? frd.sports.join(", ")
                      : frd.sports}
                    , Status: {frd.approved ? "Approved ✅" : "Pending ⏳"} |{" "}
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={faclityyesno(frd.id, "yes")}
                    >
                      ✅
                    </button>{" "}
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={faclityyesno(frd.id, "no")}
                    >
                      ❌
                    </button>
                  </p>
                ))}
              </ul>
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <button
                  type="button"
                  onClick={() => setViewFacilityRequestPopup(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Owner Dashboard */}
      <div>
        <h1>Owner Dashboard</h1>
        <p>
          Total Admin = <span></span>
        </p>
        <br />
        <p>
          Total users = <span>{usersdata.length}</span>
        </p>
        <br />
        <p>
          Total bookings = <span></span>
        </p>
        <br />
        <p>
          Total Facility = <span></span>
        </p>
        <br />
        <p>
          Total Facility Requests = <span></span>
        </p>
        <br />
        <button onClick={() => setAddAdmi(true)}>Add admins</button>
        <br />
        <button onClick={viewfacilityrequest}>View Facility request</button>
        <br />
        <button>Manage Facility</button>
        <br />
        <button>Manage admins</button>
        <br />
        <button onClick={showviewuserspopup}>View users</button>
        <br />
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Owner;
