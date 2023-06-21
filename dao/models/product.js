import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    code: { type: Number, require: true, unique: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    category: { type: String, require: true },
    thumbnail: { type: String },
    owner: { type: String, enum: ["user", "admin"], default: "admin" },
  },
  { timestamps: true }
);
ProductSchema.plugin(mongoosePaginate);

export default mongoose.model("product", ProductSchema);
