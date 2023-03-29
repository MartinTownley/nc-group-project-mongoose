import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  age: Number,
});

const User = mongoose.model("User", UserSchema);
export default User;
