import mongoose from "mongoose";

const spendSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  spendType: { type: String },
  amount: { type: String },
  date: { type: Date },
  description: { type: String },
});

export default mongoose.model("spend", spendSchema);
