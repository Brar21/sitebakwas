const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(`mongodb+srv://nihangsinghakali:HsfrJjrbNME352VZ@cluster0.aamcgkq.mongodb.net/bakwas?retryWrites=true&w=majority`);
module.exports = { connection };

