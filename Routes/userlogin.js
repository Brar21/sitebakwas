const {userModel}=require('../Model/userModel')
var CyrptoJS=require("crypto-js");
const express=require('express')
var jwt=require("jsonwebtoken");
const getUser=express.Router()

getUser.post('/',async (req, res) => {
try
    {
    let user = await userModel.findOne({ "email": req.body.email });
    const bytes = CyrptoJS.AES.decrypt(user.password, 'brar123');
    let decryptedPass = bytes.toString(CyrptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedPass) {
          var token=jwt.sign({email: user.email,name: user.name,username: user.username,userID:user._id},'jwttokens',{
            expiresIn:'10d'
        });
        res.status(200).json({success: true,token,email:user.email,name:user.name,userID:user._id});
      } else if (
        req.body.email == user.email &&
        req.body.password != decryptedPass
      ) {
        res.status(401).json({
          success: false,
          error: "Invalid Password or Check your Password address",
        });
      } else {
        res.status(400).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ success: false, error: "No user Found" });
    }
  } catch(err) {
    res.status(400).json({ Error: err.message });
  }
});
getUser.patch("/forget",async(req,res)=>{
  try{
const user=await userModel.findOne({email:req.body.email})
if(user){
  
  let decryptedPass = CyrptoJS.AES.encrypt(req.body.password,'brar123').toString()
  const update=await userModel.findByIdAndUpdate({_id:user._id},{...req.body,password:decryptedPass});
  res.status(200).json({ success: true, msg: "successfully forget password" });
  
}else{
  res.status(400).json({ success: false, error: "No user Found" });

}
  }catch(err){
    res.status(400).json({ Error: err.message });

  }
})

module.exports={getUser}
