import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";

const app = express();
const PORT = 5005;


app.use(cors());
app.options("*", cors()); 

app.use(bodyParser.json());

//MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "quickcourtmyapp"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

//  Register route
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkUser = "SELECT * FROM users WHERE email = ?";
  db.query(checkUser, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const insertUser =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(insertUser, [username, email, password], (err) => {
      if (err)
        return res.status(500).json({ message: "Error registering user" });
      res.json({ message: "User registered successfully" });
    });
  });
});

//  Login route
// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // First check in users table
  const userQuery = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(userQuery, [username, password], (err, userResult) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (userResult.length > 0) {
      return res.json({
        message: "Login successful",
        role: "user",
        data: userResult[0],
      });
    }

    // If not found in users, check in admins
    const adminQuery = "SELECT * FROM admin WHERE username = ? AND password = ?";
    db.query(adminQuery, [username, password], (err, adminResult) => {
      if (err) return res.status(500).json({ message: "Database error" });

      if (adminResult.length > 0) {
        return res.json({
          message: "Login successful",
          role: "admin",
          data: adminResult[0],
        });
      }

      // If neither table has a match
      return res.status(401).json({ message: "Invalid credentials" });
    });
  });
});

// username check route
app.post("/usernamecheck", (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ exists: false });
  }

  const query = "SELECT username FROM users WHERE username = ?";
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("❌ Error checking username:", err);
      return res.status(500).json({ exists: false });
    }

    const exists = result.length > 0;
    res.json({ exists });
  });
});

// admin register
app.post("/adminregister", (req, res) => {
  const { adminusername, adminemail, adminpassword } = req.body;

  const checkUser = "SELECT * FROM users WHERE email = ?";
  db.query(checkUser, [adminemail], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length > 0) {
      return res.status(400).json({ message: "admin already exists" });
    }

    const insertUser =
      "INSERT INTO admin (username, email, password) VALUES (?, ?, ?)";
    db.query(insertUser, [adminusername, adminemail, adminpassword], (err) => {
      if (err)
        return res.status(500).json({ message: "Error registering admin" });
      res.json({ message: "Admin registered successfully" });
    });
  });
});

//  facility route
app.post("/facility", (req, res) => {
  const { username, email, password } =  req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkUser = "SELECT * FROM users WHERE email = ?";
  db.query(checkUser, [email], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const insertUser =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(insertUser, [username, email, password], (err) => {
      if (err)
        return res.status(500).json({ message: "Error registering user" });
      res.json({ message: "User registered successfully" });
    });
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});