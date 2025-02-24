import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("connected to mongoDB");
  } catch (error) {
    console.log("MongoDB connection error", error);
  }
};

export default connectDB;
