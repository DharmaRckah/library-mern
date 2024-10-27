import mongoose from "mongoose";

const salesInvoiceSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    date: { type: String },
    InvoiceNo: { type: String },
    salesType: { type: String },
    customerType: { type: String },
    customerName: { type: String },
    selctedcash:{type:String},
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
    placeOfSupply: { type: String },
    paymentTerm: { type: String },
    dueDate: { type: String },
    // receiptDocNo: { type: String },
    dispatchedThrough: { type: String },
    destination: { type: String },
    carrierNameAgent: { type: String },
    billOfLading: { type: String },
    // motorVehicleNo: { type: String },
    billingAddress: { type: String },
    reverseCharge: { type: String },
    gstType: { type: String },
    rows: [
      {
        itemCode: { type: String },
        productName: { type: String },
        hsnCode: { type: String },
        qty: { type: Number },
        units: { type: String },
        mrp: { type: Number },
        discountpercent: { type: Number },
        discountRS: { type: Number },
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
    cash: {
      Amount: { type: Number },
      Advance: { type: Number },
      Received: { type: Number },
      Balance: { type: Number },
    },
    bank: {
      bank: { type: String },
      selectBankType: { type: String },
      transactionDate: { type: String },
      chequeNo: { type: Number },
      transactionNo: { type: Number },
      Amount: { type: Number },
      Advance: { type: Number },
      Received: { type: Number },
      Balance: { type: Number },
    },
    otherChargesDescriptions: { type: String },
    otherCharges: { type: String },
    narration: { type: String },
    grossAmount: { type: String },
    GstAmount: { type: String },
    netAmount: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("salesinvoice", salesInvoiceSchema);
