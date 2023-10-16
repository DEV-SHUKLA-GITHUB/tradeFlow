const express = require("express");
const app = express();
const server=require("http").createServer(app)
const WebSocket = require('ws');
var KiteTicker = require("kiteconnect").KiteTicker;

const mongoose = require("mongoose");
const brokerValidator = require("./validateBrokerCreds")
const registerRoute=require("./routes/register")
const loginRouter=require("./routes/login")
const userDataRouter=require("./routes/userData")
const checkAuthRouter=require("./routes/checkAuth")
const checkRouter=require("./routes/check")
const generateTokenRouter=require("./routes/generateToken")
const instruments=require("./routes/instruments")

const User = require("./models/userDetails"); // Import the user schema from userDetails.js
app.use(express.json());
const shortid = require("shortid"); 
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("fyers-api-v2/helper/helper");
const JWT_SECRET = "slkdfjlasdfkajsdlkfaksdflaksdjfoajsdofjodsf";



//connecting to database
const mongoUrl = "mongodb+srv://devshuklaji6:fU6D8Wu5BDaQlgEB@cluster0.mxffi4n.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => console.log(e));



  //Routes
  app.use("/register", registerRoute)
  app.use("/login-user", loginRouter)
  app.use("/checkAuth", checkAuthRouter)
  app.use("/userData",userDataRouter)
  app.use("/check",checkRouter)
  app.use("/generateToken",generateTokenRouter)
  app.use("/instruments",instruments)

  

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

