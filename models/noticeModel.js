import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: { type: String },
  content: { type: String },
});

export default mongoose.model("notice", noticeSchema);
