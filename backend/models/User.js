import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: [ "admin", "user"], default: "user" },
  m_no:{type:String,required:true,unique:true},
  status:{type:String},
  dor:{type:String}
});

export default mongoose.model("User", userSchema);
