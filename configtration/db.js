const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.BACK_END_PASSWORD);
module.exports = { connection };
//mongosh "mongodb+srv://cluster0.jy11wkr.mongodb.net/" --apiVersion 1 --username varinder
