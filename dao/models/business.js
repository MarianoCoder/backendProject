import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const businessSchema = new mongoose.Schema({
    name: String,
    products: [object],
   
}, { timestamps: true });

UserSchema.plugin(mongoosePaginate);


export default mongoose.model("Business", businessSchema);