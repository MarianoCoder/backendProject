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
      },
    ],
    total: Number,
<<<<<<< HEAD
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
=======
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: 'pending' },
>>>>>>> 1d845590fe7b2844a0b3e0d5b6439eb81f212db7
  },
  { timestamps: true }
);

OrderSchema.plugin(mongoosePaginate);

export default mongoose.model("Orders", OrderSchema);
