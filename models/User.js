import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: email,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.Model("User", userSchema);

export default User;
