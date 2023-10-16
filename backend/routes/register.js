const express = require('express');
const router = express.Router();
const User = require("../models/userDetails"); // Import the user schema from userDetails.js
const bcrypt = require("bcryptjs");


router.post("/", async (req, res) => {
    const { FullName, email, password, Username } = req.body;
    const encrypted = await bcrypt.hash(password, 10);
    try {
      const emailExists = await User.exists({ email });
      const usernameExists = await User.exists({ Username });
  
      if (emailExists) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      if (usernameExists) {
        return res.status(400).json({ error: "Username already exists" });
      }
  
      await User.create({
        FullName,
        email,
        password: encrypted,
        Username,
      });
  
      res.send({ status: "ok" });
    } catch (error) {
      res.status(500).send({ error: "Registration failed" });
    }
  });

  module.exports=router;