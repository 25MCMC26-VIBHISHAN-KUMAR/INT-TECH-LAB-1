require("dotenv").config();
const express = require("express");
const db = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword],
            (err) => {
                if (err) return res.status(500).send(err);
                res.send("User registered ");
            }
        );
    } catch (err) {
        res.status(500).send(err);
    }
});

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username=?",
        [username],
        async (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.length === 0)
                return res.status(400).send("User not found ");

            const user = result[0];

            const valid = await bcrypt.compare(password, user.password);
            if (!valid)
                return res.status(400).send("Invalid password ");

            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET
            );

            res.json({ token });
        }
    );
});

function verifyToken(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) return res.status(403).send("Access denied ");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid token ");

        req.user = decoded;
        next();
    });
}

// CREATE (Protected)
app.post("/products", verifyToken, (req, res) => {
    const { name, description, price, category } = req.body;

    db.query(
        "INSERT INTO products (name, description, price, category) VALUES (?, ?, ?, ?)",
        [name, description, price, category],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send("Product added ");
        }
    );
});

// READ (Public)
app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// UPDATE (Protected)
app.put("/products/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    db.query(
        "UPDATE products SET name=?, description=?, price=?, category=? WHERE id=?",
        [name, description, price, category, id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send("Product updated ");
        }
    );
});

// DELETE (Protected)
app.delete("/products/:id", verifyToken, (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM products WHERE id=?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send("Product deleted ");
    });
});

app.get("/", (req, res) => {
    res.send("Server is running ");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});