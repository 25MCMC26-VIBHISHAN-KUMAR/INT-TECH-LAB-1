const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

/* ROOT ROUTE */
app.get('/', (req, res) => {
  res.send("API is working 🚀");
});

/* GET ALL USERS */
app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching users");
    }
    res.json(result);
  });
});

/* GET SINGLE USER (optional but good) */
app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching user");
    }
    res.json(result);
  });
});

/* ADD USER */
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).send("All fields are required");
  }

  db.query(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    [name, email, age],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error adding user");
      }
      res.json({ message: "User added successfully" });
    }
  );
});

/* UPDATE USER */
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  db.query(
    "UPDATE users SET name=?, email=?, age=? WHERE id=?",
    [name, email, age, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error updating user");
      }
      res.json({ message: "User updated successfully" });
    }
  );
});

/* DELETE USER */
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting user");
    }
    res.json({ message: "User deleted successfully" });
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});