const express = require('express');
const router = express.Router();
const User = require("../models/userDetails"); // Import the user schema from userDetails.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "slkdfjlasdfkajsdlkfaksdflaksdjfoajsdofjodsf";
const brokerValidator = require("../validateBrokerCreds")
const {checkAuth}=require("../modules/auth")

router.post("/",async (req,res)=>{
    const {token, username}=req.body
    const checkAuthResponsres=checkAuth(token)
    if(!checkAuthResponse.status){
        res.status(500).json({ status: "error", msg: "jwt authintication failed" });
    }
    const userData=checkAuthResponsres.data
    var BrokerList={}
    for (const broker of userData.BrokerList) {
        if (broker.broker === BrokerList.broker) {
            BrokerList=broker
        }}
    const obj={
        broker_user_id : BrokerList.userId,
        broker_user_password : BrokerList.password,
        api_key : BrokerList.apiKey,
        api_secret : BrokerList.secretKey,
        totp_token : BrokerList.totp,
        redirect_url : "http://localhost:8000",
        broker_name: BrokerList.broker}
    // const obj={
    //     broker_user_id : "ET5487",
    //     broker_user_password : "Aizamk@77@beagle",
    //     api_key : "elrfps73mpn9aou4",
    //     api_secret : "jpsvy0sadh3xkgx74p2aswob9tcynqe5",
    //     totp_token : "3AB43VM2VKOFAD6ZP5YJOBPU5PU5HYPV",
    //     redirect_url : "http://localhost:8000",
    //     broker_name: "Zerodha"}
        const response=await brokerValidator(BrokerList,obj,userData.email)
        if(response.validCreds){
            res.send({status:true})
        }else{
            res.send({status:false})
        }
})

module.exports=router