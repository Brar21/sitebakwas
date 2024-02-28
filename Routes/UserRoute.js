const express=require("express");
const userRoute=express.Router();
userRoute.post("/login",(req,res) =>
{
    res.send("login")
})