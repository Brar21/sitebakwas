const { User } = require("../models/User");
var CyrptoJS = require("crypto-js");
const express = require("express");
const { Otpmodel } = require("../models/otp");
const nodemailer = require("nodemailer");
const userroute=express.Router();

userroute.post("/register", async (req, res) => {
  try {
    const { name, email, phone, image } = req.body;
    let u = new User(
      {
        name,
        email,
        password: CyrptoJS.AES.encrypt(req.body.password, "brar123").toString(),
      },
      phone,
      image
    );
    await u.save();
    res.status(200).json({ success: "signup done" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
userroute.post("/otp", async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const { email } = req.body;
  let user = await Otpmodel.findOne({ email: email });

  try {
    if (user) {
      res.send("already there");
    } else {
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
        subject: "Your OTP for Register or Email Verfication",
          text: `Email Verification code
        
Please use the verification code below to Register ${email} with us.

${otp}

If you didn’t request this, you can ignore this email.

Thanks,
The AkashMedicare team `,
      };
      let otpgen = new Otpmodel({ email, otp: otp });
      await otpgen.save();
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.send(error);
        } else {
          res.send({ Email: info.response });
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
});
userroute.patch("/otp", async (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const { email } = req.body;

    try
    {
        let user = await Otpmodel.findOne({ email: email });
        if(!user)
        {
            res.send({success:false})
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
        res.send({ Email: info.response ,success:true});
      }
    });
  } catch (err) {
    res.send(err);
  }
});
userroute.post("/verify", async (req, res) => {
  const { email, otp } = req.body;
  try {
    let user = await Otpmodel.findOne({ email: email });
    if (!user) {
      res.send("account is not exits");
    } else {
      if (user.otp === otp) {
        res.status(200).send("user verified");
      } else {
        res.status(400).send("wrong otp");
      }
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = { userroute };
