import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      },
    ],
    total: Number,
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

CartSchema.plugin(mongoosePaginate);

export default mongoose.model("Carts", CartSchema);
