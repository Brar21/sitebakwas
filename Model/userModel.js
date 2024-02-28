const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    mobile_no:Number
})
const userModel=mongoose.model("user",userSchema)
module.exports={userModel}