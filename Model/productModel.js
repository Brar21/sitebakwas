const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
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
    Brand: String,
    packagingof: Number,
    description: String,
    price: Number,
    reviews: String,
    stockquantity: Number,
    rating: Number,
    shipfrom: String,
    seller: String,
    size: String,
  },
  { timestamps: true }
);
const ProductModel = mongoose.model("product", productSchema);
module.exports = { ProductModel };
