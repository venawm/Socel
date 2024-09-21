import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  userName: { type: String },
});

export default mongoose.model("Comment", commentSchema);
