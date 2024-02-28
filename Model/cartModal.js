const mongoose = require("mongoose");
const carttSchema = mongoose.Schema(
  {
    productID: Number,
    productImage: URL,
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
    quantity: Number,
  },
  { timestamps: true }
);
const cartModel = mongoose.model("cart", carttSchema);
module.exports = { cartModel };
