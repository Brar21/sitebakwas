const express = require("express");
const cartRoute = express.Router();
const { cartModel } = require("../Model/cartModel");
cartRoute.post("/cart", async (req, res) => {
  console.log(req);

  try {
    console.log(req);
    const cart = new cartModel({ ...req.body });
    await cart.save();
    console.log(cart);
    res.status(200).json({ msg: "cart Posted Successfully", success: true });
  } catch (err) {
    res.status(400).send({ msg: err, success: false });
  }
});
cartRoute.get("/", async (req, res) => {
  try {
    let cart = await cartModel.find();
    res.status(200).send(cart);
  } catch (err) {
    res.status(404).send({ err: err.message });
  }
});

cartRoute.patch("/cart/:id", async (req, res) => {
  console.log(req.body);
  try {
    const cart = await cartModel.findByIdAndUpdate(
      { _id:req.params.id },
      req.body
    );
    res.status(200).json({ msg: "Blog is updated by authorized user", cart });
  } catch (err) {
    res.status(400).send("not update");
  }
});
cartRoute.delete("/cart/:id", async(req, res) => {
    try {
        const cart = await cartModel.findByIdAndDelete(
          { _id:req.params.id }
        );
        res.status(200).json({ msg: "Blog is deleted by authorized user", cart });
      } catch (err) {
        res.status(400).send("not update");
      }
});
module.exports = { cartRoute };
