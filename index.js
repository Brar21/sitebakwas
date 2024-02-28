//index.js
const express = require("express");
require("dotenv").config();
const SendOtp = require("sendotp");
const {productRoute}=require("./Routes/ProdcutsRoute");
const {cartRoute}=require("./Routes/cartRoute")
const { connection } = require("./configtration/db");
const app = express();
const cors = require("cors");
const sendOtp = new SendOtp(
  "MSG91",
  "Otp for your order is {{otp}}, please do not share it with anybody"
);
//sendOtp.send(contactNumber, senderId, otp, callback); //otp is optional if not sent it'll be generated automatically
//sendOtp.retry(contactNumber, retryVoice, callback);
//sendOtp.verify(contactNumber, otpToVerify, callback);
app.use(cors());
app.use(express.json())
app.get("/", (req, res) => {
  sendOtp.send("916280849667", "PRIIND", function (error, data) {
    console.log(data);
  });
  res.send("Welcome");
});
app.use("/product", productRoute);
app.use("/cart",cartRoute)
app.listen(process.env.Port, async () => {
  console.log(process.env.Port);
  try {
    await connection;
    console.log("MongoDB is rady to use");
  } catch (err) {
    console.log("not connected");
  }
});
