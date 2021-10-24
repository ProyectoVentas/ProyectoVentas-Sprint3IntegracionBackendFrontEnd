const mongoose=require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
    imgURL: String,
  },
  {
    timestamps: true,
    versionKey: false
  }
);

 const Product= mongoose.model("Product", ProductSchema);
 module.exports = Product;