const express = require('express');
const router = express.Router();
const User = require("../models/userDetails"); // Import the user schema from userDetails.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { route } = require('./register');
const brokerValidator = require("../validateBrokerCreds")
const JWT_SECRET = "slkdfjlasdfkajsdlkfaksdflaksdjfoajsdofjodsf";

router.post("/", async (req, res) => {
    
    var isValidated=false;
    const { token, BrokerList } = req.body;
    console.log(BrokerList)
    
  const obj={
    broker_user_id : BrokerList.userId,
    broker_user_password : BrokerList.password,
    api_key : BrokerList.apiKey,
    api_secret : BrokerList.secretKey,
    totp_token : BrokerList.totp,
    redirect_url : "http://localhost:8000",
    broker_name: BrokerList.broker}
    
    try {
        // Verify the token and extract the user's email
        const user = jwt.verify(token, JWT_SECRET);
        const {email} = user;   
        const response=await brokerValidator(BrokerList,obj,email)
        isValidated=response.validCreds
      // Find the user in the database using the email
      if(isValidated){
      res.json({ status: true}); 
      }
    } catch (error) {
      // console.log("first")
      res.status(500).json({ status: "error", data: error });
    }
  });
  

module.exports=router;