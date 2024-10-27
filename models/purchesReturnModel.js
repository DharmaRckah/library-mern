import mongoose from "mongoose";

const purchesReturnSchema = new mongoose.Schema(
  {
    admin :{type:mongoose.Schema.Types.ObjectId,
      ref:"user",
      required:true,
    },
    supplierName: { type: String },
    cash:{type:String},
    selectedBank: [
      {
        bankId: { type: mongoose.Schema.Types.ObjectId, ref: "Bank" }, // Reference to the bank
        name: { type: String }, // e.g. "SBI"
        ifscCode: { type: String },
        accountNumber: { type: String },
        openingBalance: { type: String },
        drCr: { type: String }, // Debit or Credit
      },
    ],
    date: { type: String },
    debitNoteNo:{type:String},  
    paymentTerm: { type: String },
    dueDate: { type: String },
    billingAddress: { type: String },
    selectPurchase: { type: String },
    reasonForReturn: { type: String },
    gstType: { type: String },
    rows: [
      {
        itemCode: { type: String },
        productName: { type: String },
        hsnCode: { type: String },
        units: { type: String },
        quantity: { type: Number },
        freeQty:{type:String},
        maxmimunRetailPrice: { type: Number },
        unitCost: { type: Number },
        schemeMargin: { type: String },
        discountpercent: { type: Number },
        discountRs: { type: Number },
        taxableValue: { type: Number },
        cgstpercent: { type: Number },
        cgstRS: { type: Number },
        sgstpercent: { type: Number },
        sgstRS: { type: Number },
        igstpercent: { type: Number },
        igstRS: { type: Number },
        totalValue: { type: Number },
      },
    ],
    otherChargesDescriptions: { type: String },
    otherCharges: { type: String },
    narration: { type: String },
    grossAmount: { type: String },
    GstAmount: { type: String },
    netAmount: { type: String },
    documentPath: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("purchesReturn", purchesReturnSchema);
