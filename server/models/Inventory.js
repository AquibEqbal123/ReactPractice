import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: String,
  category: {
  type: String,
  enum: ["Electronics", "Furniture", "Other"],
  required: true,
  set: (v) =>
    v.charAt(0).toUpperCase() + v.slice(1).toLowerCase(),
},
  stock: Number,
  price: Number,
  status:{
    type: String,
  },
});

export default mongoose.model("Inventory", inventorySchema);