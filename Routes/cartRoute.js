const express=require("express");
const userRoute=express.Router();
userRoute.post("/cart",(req,res) =>
{
    res.send("cart page")
})