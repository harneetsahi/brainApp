import mongoose from "mongoose";

const connectDB = async () => {
  console.log("trying to connect");
  try {
    console.log("trying to connect inside try catch");
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("FAILED to connect");
    console.log("MongoDB connection error", error);
  }
};

export default connectDB;
