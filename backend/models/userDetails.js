const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    FullName: String,
    email: { type: String, unique: true },
    password: String,
    Username: { type: String, unique: true },
    BrokerList: Object, // Array field to store form data
  },
  {
    collection: "userInfo",
  }
);


module.exports = mongoose.model("User", userSchema);
