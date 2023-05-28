import mongoose from "mongoose";
let isConnected = false;

const connectDb = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("mongoose is already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "RemindX",
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("mongoose connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb();
