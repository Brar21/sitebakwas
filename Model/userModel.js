const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required:true },
    image: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWnW0NUpcrZcGZeUJ4e50ZLU8ugS9GPPoqww&usqp=CAU" },
  },
  { timestamps: true })
const userModel=mongoose.model("user",userSchema)
module.exports={userModel}