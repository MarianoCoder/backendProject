import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
    },
    products: [
      {
        product: {
          type: Number,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
      }
    ],
    total: Number,
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending"},
    },
  { timestamps: true }
);

OrderSchema.plugin(mongoosePaginate);

export default mongoose.model("Orders", OrderSchema);
