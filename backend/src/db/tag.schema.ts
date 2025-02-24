import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Tag = mongoose.model("Tag", tagSchema);
