const User = require("./models/userDetails");
const mongoose = require("mongoose");

const mongoUrl = "mongodb+srv://devshuklaji6:fU6D8Wu5BDaQlgEB@cluster0.mxffi4n.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => console.log(e));
User.find({ email: "yoda@gmail.com" })
      .then((userData) => {
        console.log(userData[0].BrokerList) // Add user data to the request object // Pass control to the next middleware or route handler
      })
      .catch((error) => {
        console.error(error);
        // res.status(401).json({ message: "Unauthorized" });
      });