const express = require('express');
const User = require("../models/userDetails");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "slkdfjlasdfkajsdlkfaksdflaksdjfoajsdofjodsf";

function checkAuth(token) {
  console.log("token" , token)
  return new Promise((resolve, reject) => {
    try {
      const user = jwt.verify(token, JWT_SECRET);
      const userEmail = user.email;
console.log(userEmail)
      User.findOne({ email: userEmail })
      
        .then((userData) => {
          resolve({ status: "ok", data: userData });
        })
        .catch((error) => {
          reject({ status: "error", data: error });
        });
    } catch (error) {
      reject({ status: "error", data: error });
    }
  });
}

module.exports = { checkAuth };
