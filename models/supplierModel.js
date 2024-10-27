import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },

    bankName: {
      type: String,
      required: true,
    },
    bankAddress: {
      type: String,
    },
    ifscCode: {
      type: String,
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },

    registrationType: {
      type: String,
      required: true,
    },
    gstin: {
      type: String,
    },

    openingBalance: {
      type: Number,
      required: true,
    },
    Admin:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Supplier", supplierSchema);
