const { userModel } = require("../Model/userModel");
var CyrptoJS = require("crypto-js");
const express = require("express");
const { Otpmodel } = require("../Model/otp");
const nodemailer = require("nodemailer");
const userroute = express.Router();
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail.com",
  host: "smtp.gmail.net",
  auth: {
    user: "vs21418@gmail.com",
    pass: "zhao rnyi fqum dfkg",
  },
});

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("email sent");
  } catch (error) {
    console.log(error);
  }
};

userroute.post("/", async (req, res) => {
  const otp = Math.floor(100 + Math.random() * 900000);
  try {
    const { name, email, phone, image } = req.body;

    let u = new userModel({
      name,
      email,
      password: CyrptoJS.AES.encrypt(req.body.password, "brar123").toString(),
      phone,
      image,
    });

    const mailOptions = {
      from: { name: "Akash Medicare", address: "nihangsinghakali@gmail.com" },
      to: email,
      subject: "Welcome to AkashMedicare 😊", // Subject line
      text: "Hello world?", // plain text body
        html: `<p>Email Verification code 
      <br>Please use the verification code below to verification of&nbsp; &nbsp;<b>${email}</b> email address.
<br>               
     <b> ${otp} </b>
<br>          
      If you didn’t request this, you can ignore this email</p>.
      <br>  
      Thanks,
      <br>
      <strong>The AkashMedicare team</strong>`, // html body
    };
      await u.save();
      const expiretime=new Date().getTime()+5*60*1000
    let otpgen = new Otpmodel({ email, otp: otp, expiretime });
    await otpgen.save();
    sendMail(transporter, mailOptions);
    res.status(200).json({ success: "signup done" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

userroute.patch("/otp", async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const { email } = req.body;

  try {
    let user = await Otpmodel.findOne({ email: email });
    if (!user) {
      res.send({ success: false });
    }

    const config = {
      service: "gmail",
      auth: {
        user: "sssaini67730@gmail.com",
        pass: "mpldhbnmuqposgkd",
      },
    };
    let transporter = nodemailer.createTransport(config);
    var mailOptions = {
      from: "sssaini67730@gmail.com",
      to: email,
      subject: "OTP Request for Reset Password",
      text: `Email Verification code

Please use the verification code below to Reset or Forget password of ${email}.
                
${otp}
                
If you didn’t request this, you can ignore this email.
                
Thanks,
The JavascriptFolks team`,
    };

    await Otpmodel.findByIdAndUpdate(
      { _id: user._id },
      { ...req.body, otp: otp }
    );
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send(error);
      } else {
        res.send({ Email: info.response, success: true });
      }
    });
  } catch (err) {
    res.send(err);
  }
});
userroute.post("/verify", async (req, res) => {
    const {email,otp}=req.body;
    const currentTime=new Date().getTime()
    try
    {
        let userdetails=await userModel.findOne({email: email});
    let user = await Otpmodel.findOne({ email: email });
    if (!userdetails) {
      res.send("account is not exits");
      } if(currentTime>user?.expiretime)
      {
          await Otpmodel.findByIdAndDelete({_id: user._id})
          const mailOptions = {
            from: { name: "Akash Medicare", address: "nihangsinghakali@gmail.com" },
            to: email,
            subject: "Welcome to AkashMedicare 😊", // Subject line
            text: "Hello world?", // plain text body
              html: `<p>Email Verification code 
            <br>Please use the verification code below to verification of&nbsp; &nbsp;<b>${email}</b> email address.
      <br>               
           <b> ${otp} </b>
      <br>          
            If you didn’t request this, you can ignore this email</p>.
            <br>  
            Thanks,
            <br>
            <strong>The AkashMedicare team</strong>`, // html body
          };
          sendMail(transporter,mailOptions);
          res.send("resend code again after 5 mints")
    } else {
      if (user.otp === otp) {
          res.status(200).send("user verified");
          await Otpmodel.findByIdAndDelete({_id:user._id})
      } else if(user.otp !== otp){
        res.status(400).send("wrong otp");
          }
          res.send("already verified")
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = { userroute };
