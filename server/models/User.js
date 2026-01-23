// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true
//     },
//     password: {
//       type: String,
//       required: true
//     },
//     address: {
//       type: String
//     },
//     pincode: {
//       type: String
//     },
//     city: {
//       type: String
//     },
//     state: {
//       type: String
//     }
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// export default User;   // ✅ THIS LINE IS MUST



//2
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee"
  }
});

export default mongoose.model("User", userSchema);
