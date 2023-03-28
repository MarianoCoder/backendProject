import mongoose from "mongoose";

const product = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    code: { type: Number, require: true, unique: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    category: { type: String, require: true },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("product", product);