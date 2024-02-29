//index.js
require("dotenv").config();
const express = require("express");
const {productRoute}=require("./Routes/ProdcutsRoute");
const {cartRoute}=require("./Routes/cartRoute")
const { connection } = require("./configtration/db");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json())
app.get("/", (req, res) => {
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
