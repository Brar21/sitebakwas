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
    pass: "qwso ibnm xzps tmhd",
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
  try {
    const { name, email, phone } = req.body;
console.log(req.body)
    let u = new userModel({
      name,
      email,
      password: CyrptoJS.AES.encrypt(req.body.password, "brar123").toString(),
      phone,
    });

    await u.save();

    res.status(200).json({ success: "signup done" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});
userroute.post("/otp", async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const { email } = req.body;
  try {
    let user = await Otpmodel.findOne({ email: email });
    if (user) {
      res.send({ success: "user already there" });
    } else {
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
      const expiretime = new Date().getTime() + 1 * 60 * 1000;
      let otpgen = new Otpmodel({ email, otp: otp, expiretime });
      await otpgen.save();
      sendMail(transporter, mailOptions);
      res.status(200).json({ success: "otp send" });
    }
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
  const newotp = Math.floor(100000 + Math.random() * 900000);
    
  const currentTime = new Date().getTime();
  try {
    let userdetails = await userModel.findOne({ email: email });
    let user = await Otpmodel.findOne({ email: email });
console.log(currentTime-user.expiretime)
    if (currentTime > user?.expiretime && user) {
      console.log(user);
      await Otpmodel.findByIdAndUpdate({ _id: user._id },{otp:newotp});
      const mailOptions = {
        from: { name: "Akash Medicare", address: "nihangsinghakali@gmail.com" },
        to: email,
        subject: "Welcome to AkashMedicare 😊", // Subject line
        text: "Hello world?", // plain text body
        html: `<p>Email Verification code 
            <br>Please use the verification code below to verification of&nbsp; &nbsp;<b>${email}</b> email address.
      <br>               
           <b> ${newotp} </b>
      <br>          
            If you didn’t request this, you can ignore this email</p>.
            <br>  
            Thanks,
            <br>
            <strong>The AkashMedicare team</strong>`, // html body
      };
      sendMail(transporter, mailOptions);
      res.send("resend code again after 5 mints");
    } else {
      console.log(user);
      console.log(otp,user.otp==otp);
      if (user.otp == otp) {
        //  await Otpmodel.findByIdAndDelete({ _id: user._id });
        res.status(200).send("user verified");
      } else if (user.otp !== otp) {
        res.status(400).send("wrong otp");
      }
      res.send("already verified");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = { userroute };
