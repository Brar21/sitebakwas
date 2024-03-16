//index.js
require("dotenv").config();
const express = require("express");
const {productRoute}=require("./Routes/ProdcutsRoute");
const {cartRoute}=require("./Routes/cartRoute")
const {connection}=require("./configtration/db");
const {userroute}=require("./Routes/userRegistration")
const {getUser}=require("./Routes/userlogin")
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use("/product", productRoute);
app.use("/cart",cartRoute)
app.use("/register",userroute)
app.use("/login",getUser)
app.listen(process.env.Port, async () => {
  console.log(process.env.Port);
  try {
    await connection;
    console.log("MongoDB is ready to use");
  } catch (err) {
    console.log("not connected");
  }
});
