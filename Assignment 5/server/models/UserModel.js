import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  userId: String,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
