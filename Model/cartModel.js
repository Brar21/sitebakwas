const mongoose = require("mongoose");
const carttSchema = mongoose.Schema(
  {
    productID: Number,
    productImage: String,
    productImage2: String,
    productImage3: String,
    productImage4: String,
    productImage5: String,
    productName: String,
    color: String,
    category: String,
    userId: { type: String, require: true },
    Brand: String,
    packagingof: Number,
    description: String,
    offerprice: Number,
    reviews: String,
    stockquantity: Number,
    rating: Number,
    shipfrom: String,
    seller: String,
    size: String,
    price: Number,
  },
  { timestamps: true }
);
const cartModel = mongoose.model("cart", carttSchema);
module.exports = { cartModel };
