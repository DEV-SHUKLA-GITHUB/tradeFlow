var KiteTicker = require("kiteconnect").KiteTicker;
const KiteConnect = require("kiteconnect").KiteConnect;
const fs = require('fs');
const express = require('express');
const app=express()
const server=require("http").createServer(app)
const WebSocket = require('ws');
const router = express.Router();
const User = require("../models/userDetails"); // Import the user schema from userDetails.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "slkdfjlasdfkajsdlkfaksdflaksdjfoajsdofjodsf";
 
router.post("/getInstruments",async (req,res)=>{
  const {email, username, token}=req.body
    
    try {
    const jsonData=await User.findOne({email})
    // console.log(jsonData)
     
    // Extract the access token
    const { accessToken, apiKey } = jsonData.BrokerList.find(broker => broker.broker === "Zerodha");
    //  console.log(accessToken, apiKey)
    const access_token=accessToken
    const api_key=apiKey
    const a=async ()=>{
    // console.log("test",await kite.())
    // Javascript example.
    console.log(access_token, api_key)
    const kite = new KiteConnect({ api_key});
    kite.setAccessToken(access_token);
    
    //here perform any kite operations
    const instruments=await kite.getInstruments(["NSE"])
    res.send(instruments)
    }
    a()
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }

})





//setting up websocket for data stream

// const wss = new WebSocket.Server({ port: 8000 }); // Replace port number as per your requirement

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', async (message) => {
//     const initialData = JSON.parse(message);
//     const { token, instrumentToken, email } = initialData;
//     // Use the received data (token, instrumentToken, email) for further processing or to retrieve the required tick data
//     try {
//       const jsonData=await User.findOne({email})
//     // Extract the access token
//     const { accessToken, apiKey } = jsonData.BrokerList.find(broker => broker.broker === "Zerodha");
//     const access_token=accessToken
//     const api_key=apiKey
//       const a=async ()=>{
//         var ticker = new KiteTicker({api_key, access_token});
//         function onTicks(ticks) {
//         ws.send(JSON.stringify(ticks));
//         console.log("Ticks", ticks);
//       }
//       function subscribe() {
//           var items = [Number(instrumentToken)];
//           ticker.subscribe(items);
//           ticker.setMode(ticker.modeQuote, items);
//       }
    
//         ticker.connect();
//         ticker.on("connect", subscribe);
//         ticker.on("ticks", onTicks);     
// }
// a()
//     } catch (error) {
//       console.error('Error parsing JSON:', error);
//     }
//     // Example: Send tick data to the connected client
//     setInterval(() => {
//       const ticks = generateTickData(); // Replace this with your own method to fetch or generate tick data
//       ws.send(JSON.stringify(ticks));
//     }, 1000);
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });
















//...................................................................................................

const wss = new WebSocket.Server({ port: 7000 }); // Replace port number as per your requirement

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', async (message) => {
    const initialData = JSON.parse(message);
    const { token, instrumentToken, email } = initialData;
    // Use the received data (token, instrumentToken, email) for further processing or to retrieve the required tick data
    try {
      const jsonData=await User.findOne({email})
    // Extract the access token
    const { accessToken, apiKey } = jsonData.BrokerList.find(broker => broker.broker === "Zerodha");
    const access_token=accessToken
    const api_key=apiKey
      const a=async ()=>{
        var ticker = new KiteTicker({api_key, access_token});
        function onTicks(ticks) {
        ws.send(JSON.stringify(ticks));
        console.log("Ticks", ticks);
      }
      function subscribe() {
          var items = [Number(instrumentToken)];
          ticker.subscribe(items);
          ticker.setMode(ticker.modeQuote, items);
      }
    
        ticker.connect();
        ticker.on("connect", subscribe);
        ticker.on("ticks", onTicks);     
}
a()
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
    // Example: Send tick data to the connected client
    // setInterval(() => {
    //   const ticks = generateTickData(); // Replace this with your own method to fetch or generate tick data
    //   ws.send(JSON.stringify(ticks));
    // }, 1000);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

//....................................................................................................



// router.post("/getData",async (req,res)=>{
//   const { }=req.body
      
//      try {
//       const jsonData=await User.findOne({email})
//     // Extract the access token
//     const { accessToken, apiKey } = jsonData.BrokerList.find(broker => broker.broker === "Zerodha");
//     const access_token=accessToken
//     const api_key=apiKey
//       const a=async ()=>{
//         var ticker = new KiteTicker({api_key, access_token});
//         function onTicks(ticks) {
//         console.log("Ticks", ticks);
//       }
//       function subscribe() {
//           var items = [Number(instrumentToken)];
//           ticker.subscribe(items);
//           ticker.setMode(ticker.modeQuote, items);
//       }
    
//         ticker.connect();
//         ticker.on("connect", subscribe);
//         ticker.on("ticks", onTicks);
        
// }
// a()
//     } catch (error) {
//       console.error('Error parsing JSON:', error);
//     }
//     });
    
  
  

module.exports=router;