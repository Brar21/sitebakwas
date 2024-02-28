const express = require("express");
const productRoute = express.Router();
const { ProductModel } = require("../Model/productModel");
productRoute.post("/product", async (req, res) => {
  console.log(req);

  try {
    console.log(req);
    const product = new ProductModel({ ...req.body });
    await product.save();
    console.log(product);
    res.status(200).json({ msg: "product Posted Successfully", success: true });
  } catch (err) {
    res.status(400).send({ msg: err, success: false });
  }
});
productRoute.get("/", async (req, res) => {
  try {
    let product = await ProductModel.find();
    res.status(200).send(product);
  } catch (err) {
    res.status(404).send({ err: err.message });
  }
});
productRoute.get("/:id", async (req, res) => {
    try {
      let product = await ProductModel.findOne({_id:req.params.id});
      res.status(200).send(product);
    } catch (err) {
      res.status(404).send({ err: err.message });
    }
  })
productRoute.patch("/product/:id", async (req, res) => {
  console.log(req.body);
  try {
    const product = await ProductModel.findByIdAndUpdate(
      { _id:req.params.id },
      req.body
    );
    res.status(200).json({ msg: "Blog is updated by authorized user", product });
  } catch (err) {
    res.status(400).send("not update");
  }
});
productRoute.delete("/product/:id", async(req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(
          { _id:req.params.id }
        );
        res.status(200).json({ msg: "Blog is deleted by authorized user", product });
      } catch (err) {
        res.status(400).send("not update");
      }
});
module.exports = { productRoute };
