const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], function(err) {
    if (err) return res.status(400).json({ error: "User already exists" });
    res.json({ success: true });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err || !user) return res.status(400).json({ error: "User not found" });

    if (bcrypt.compareSync(password, user.password)) {
      req.session.user = { id: user.id, email: user.email };
      res.json({ success: true, user: req.session.user });
    } else {
      res.status(400).json({ error: "Invalid password" });
    }
  });
});

router.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.json({ message: "Welcome to dashboard", user: req.session.user });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.json({ success: true });
});

module.exports = router;
