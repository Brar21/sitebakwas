const mongoose = require("mongoose");
const otpschema = mongoose.Schema({
  otp: Number,
  email: String,
  expiretime: Number,
});
const Otpmodel = mongoose.model("otp", otpschema);
module.exports = { Otpmodel };
