const express = require('express');
const router = express.Router();
const User = require("../models/userDetails"); // Import the user schema from userDetails.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "slkdfjlasdfkajsdlkfaksdflaksdjfoajsdofjodsf";

router.post("/", async (req, res) => {
    const { email, Username } = req.body;
    try {
      const emailExists = await User.exists({ email });
      const usernameExists = await User.exists({ Username });
      res.json({ emailExists, usernameExists }); // Return the response as JSON
    } catch (error) {
      res.status(500).json({ error: "Error checking email and username" }); // Return the error response as JSON
    }
  });
 
module.exports=router;