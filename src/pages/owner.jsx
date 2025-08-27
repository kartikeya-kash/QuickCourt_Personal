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
        }, 2000);
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

  if (loading) {
    return <h2>Checking access...</h2>;
  }

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

  const logout = () => {
    localStorage.removeItem("isloggedin");
    localStorage.removeItem("role");
    navigate("/");
  };

  const showviewuserspopup = async () => {
    setViewUsersPopup(true);
  };

  if (usersLoading) {
    return <Loader />;
  }
  return (
    <div>
      {/*view users pop up*/}
      {viewuserspopup && (
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
                <button type="button" onClick={() => setViewUsersPopup(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
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
        <button>View Facility request</button>
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
