import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const UserSchema = new mongoose.Schema({
  
    first_name: String, 
    last_name: String, 
    email: { type: String, unique: true},
    age: Number, 
    password: String, 
});

UserSchema.plugin(mongoosePaginate);


export default mongoose.model("User", UserSchema);
