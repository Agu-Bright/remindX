import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: "String",
    unique: [true, "Email Already Exists"],
    required: [true, "Email is Required"],
  },
  userName: {
    type: "String",
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![0-9]+$)(?!.*?\s)[a-zA-Z0-9]+$/,
      "Username invalid, it should contain 8 - 20 alphanumeric letters and must be unique!",
    ],
  },
  image: {
    type: "String",
    required: [true, "image is required"],
  },
  phoneNumber: {
    type: "String",
    unique: true,
  },
});

//because this route is called every time a user signIn we need to make this additional check
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
