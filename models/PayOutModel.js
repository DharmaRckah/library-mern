import mongoose from "mongoose";

const payOutSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "user",required:true},
    date: { type: String },
    paymentNo: { type: String },
    supplierName: { type: String },
    paymentMode: { type: String },
    selectBank: { type: String },
    method: { type: String },
    transactionCheckNo: { type: String },
    rows: [
      {
        billNo: { type: String },
        billAmount: { type: String },
        recievedAmount: { type: Number },
        balanceAmount: { type: Number },
      },
    ],
    grandtotal: { type: String },
    Narration: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("payOut", payOutSchema);
