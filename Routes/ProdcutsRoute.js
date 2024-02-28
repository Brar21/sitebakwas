const express=require("express");
const productRoute=express.Router();
const {prodcutModal}=require("../Model/productModel")
productRoute.post("/product",async(req,res) =>
{
    console.log(req)

    try {
        console.log(req)
        const product = new prodcutModal({ ...req.body});
        await product.save();
        console.log(product)
        res.status(200).json({ msg:"product Posted Successfully",success:true });
      } catch (err) {
        res.status(400).send({ msg:err,success:false });
      }
})
productRoute.get("/",async (req,res) =>
    {
        try
        {
            let product=await prodcutModal.find();
            res.status(200).send(product);
        } catch(err)
        {
            res.status(404).send({err: err.message});
        }
})
productRoute.patch("/product",(req,res) =>
{
    res.send("product page")
})
productRoute.delete("/product",(req,res) =>
{
    res.send("product page")
})
module.exports={productRoute}
