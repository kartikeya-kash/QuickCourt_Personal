import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";

const app = express();
const PORT = 5005;


app.use(cors());
app.options("*", cors()); 

app.use(bodyParser.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "quickcourtmyapp"
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// ✅ Register route
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

// ✅ Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
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



// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});