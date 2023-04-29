import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const MessageSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    message: { type: String, require: true },
  },
  { timestamps: true }
)

MessageSchema.plugin(mongoosePaginate);

export default mongoose.model("message", MessageSchema);
