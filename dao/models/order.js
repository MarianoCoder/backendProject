import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const ordersSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business"
    },
    products: [Number],
    total: Number,
    status: { type: String, enum: ["pending", "completed"]}

}, { timestamps: true })

UserSchema.plugin(mongoosePaginate);


export default mongoose.model("Orders", ordersSchema);