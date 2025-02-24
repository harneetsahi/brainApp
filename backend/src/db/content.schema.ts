import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  tags: {
    type: [Schema.Types.ObjectId],
    ref: "Tag",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Content = mongoose.model("Content", contentSchema);
