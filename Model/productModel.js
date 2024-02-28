const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  productID: Number,
  productImage: String,
  productName: String,
  color: String,
  packagingof: Number,
  description: String,
  price: Number,
  reviews: String,
  stockquantity: Number,
  rating: Number,
  shipfrom: String,
  seller: String,
},{ timestamps: true });
const ProductModel = mongoose.model("product", productSchema);
module.exports = { ProductModel };
