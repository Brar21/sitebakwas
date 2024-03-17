const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.BACK_END_PASSWORD);
module.exports = { connection };

