import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const UserSchema = new mongoose.Schema({
  
    first_name: { type: String, require: true }, 
    last_name: { type: String, require: true }, 
    email: { type: String, require: true, unique: true},
    age: { type: Number, require: true }, 
    password: { type: String, require: true }, 
    cartId: { type: Number, require: true, unique: true },
    role: { type: String, require: true },
});

UserSchema.plugin(mongoosePaginate);


export default mongoose.model("User", UserSchema);
