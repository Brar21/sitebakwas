const express = require("express");
const cartRoute = express.Router();
const { cartModel } = require("../Model/cartModel");
cartRoute.post("/", async (req, res) => {
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
  const { userId } = req.body;
  try {
    let cart = await cartModel.find(userId);
    res.status(200).send(cart);
  } catch (err) {
    res.status(404).send({ err: err.message });
  }
});

cartRoute.patch("/cart/:id", async (req, res) => {
  const { userId } = req.headers;
  console.log(req.body);
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
      res
        .status(200)
        .json({ msg: "Product is updated by authorized user", cart });
    } else {
      res.status(401).json({ msg: "You are Unauthorize User" });
    }
  } catch (err) {
    res.status(400).send("cart updation have some error");
  }
});
cartRoute.delete("/cart/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.headers;
  try {
    let match = await cartModel.findOne({ _id: id, userId: userId });
    if (match) {
      let cartdelete = await cartModel.findByIdAndDelete(
        { _id: id, userId: userId },
        req.body
      );
      res.status(200).json({ msg: "cart product is deleted" });
    } else {
      res.status(401).json({ msg: "You are Unauthorize User" });
    }
  } catch (err) {
    res.status(400).send("not update");
  }
});
module.exports = { cartRoute };
