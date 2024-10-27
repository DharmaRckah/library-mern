import mongoose from "mongoose";

const feesplanSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  planName: { type: String },
  planduration: { type: String },
  planprice: { type: String },
  description: { type: String },
});

export default mongoose.model("feesplan", feesplanSchema);
