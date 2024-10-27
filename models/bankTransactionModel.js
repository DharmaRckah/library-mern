import mongoose from "mongoose";
const banktransctionSchecma = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    date: {
      type: Date,
    },
    contraNo: {
      type: String,
    },
    fromAccount: {
      type: String,
    },
    amount: {
      type: String,
    },
    toAccount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("BankTransaction", banktransctionSchecma);
