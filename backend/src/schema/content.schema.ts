import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  link: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Content = mongoose.model("Content", contentSchema);
