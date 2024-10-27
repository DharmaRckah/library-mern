import mongoose from "mongoose";

const posSchema = new mongoose.Schema(  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "user",required:true, },
    date: { type: String },
    invoicNo: { type: String },
    customerDetail: { type: String },
    paymentType: { type: String },
    rows: [
      {
        itemCode: { type: String },
        productName: { type: String },
        qty: { type: Number },
        mrp: { type: Number },
        retailPrice: { type: Number },
        taxable: { type: Number },
        cgstpercent: { type: Number },
        cgstRS: { type: Number },
        sgstpercent: { type: Number },
        sgstRS: { type: Number },
        igstpercent: { type: Number },
        igstRS: { type: Number },
        totalValue: { type: Number },
      },
    ],
    grossAmount: { type: String },
    GstAmount: { type: String },
    netAmount: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("pointOfSale", posSchema);