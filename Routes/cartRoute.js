const express = require("express");
const cartRoute = express.Router();
const { cartModel } = require("../Model/cartModel");
cartRoute.post("/", async (req, res) => {
  try {
    const cart = new cartModel({ ...req.body });
    await cart.save();
    res.status(200).json({ success: true, msg: "cart Posted Successfully" });
  } catch (err) {
    res.status(400).send({ msg: err, success: false });
  }
});
cartRoute.get("/", async (req, res) => {
  const { userId } = req.headers;
  try {
    let cart = await cartModel.find(userId);
    res.status(200).send({ success: true, msg: res.message,cart });
  } catch (err) {
    res.status(404).send({ err: err.message });
  }
});

cartRoute.patch("/cart/:id", async (req, res) => {
  const { userId } = req.headers;

  try {
    let findproduct = await cartModel.findOne({
      _id: req.params.id,
      userId: userId,
    });
    if (findproduct) {
      const cartUpdate = await cartModel.findByIdAndUpdate(
        { _id: req.params.id, userId },
        req.body
      );
      res.status(200).json({ success: true, msg: res.message, cart });
    } else {
      res.status(401).json({ msg: "You are Unauthorize User" });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: err.message });
  }
});
cartRoute.delete("/cart/:id", async (req, res) => {
  const { authorization } = req.headers;
  console.log(authorization);
  try {
    let match = await cartModel.findOne({
      _id: req.params.id,
      userId: authorization,
    });
    if (match) {
      let cartdelete = await cartModel.findByIdAndDelete({
        _id: req.params.id,
      });
      res
        .status(200)
        .json({ success: true, msg: "cart product is deleted", cartdelete });
    } else {
      res.status(401).json({ success: false, msg: "You are Unauthorize User" });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: err.message });
  }
});
module.exports = { cartRoute };
