import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const businessSchema = new mongoose.Schema({
    name: String,
    products: [Object],
   
}, { timestamps: true });

businessSchema.plugin(mongoosePaginate);


export default mongoose.model("Business", businessSchema);