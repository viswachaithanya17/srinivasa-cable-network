import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  serialNo: Number,
  name: String,
  vcNo: String,
  address: String,
  phone: String,
  image: String 
});


export default mongoose.model("Record", recordSchema);
