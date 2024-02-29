const mongoose = require("mongoose");
const otpschema = mongoose.Schema({
  otp: String,
  email: String,
});
const Otpmodel = mongoose.model("otp", otpschema);
module.exports = { Otpmodel };