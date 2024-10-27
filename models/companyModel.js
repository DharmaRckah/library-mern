import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    photo: [
      {
        type: String,
      },
    ],

    businessName: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    pinCode: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    contact: {
      type: String,
    },
    financialYear: {
      type: String,
    },
    bookFrom: {
      type: String,
    },

    enable_gst: {
      type: String,
    },
    s_state: {
      type: String,
    },
    registration_Type: {},

    tax_Rate: {
      type: String,
    },
    gstIn: {
      type: String,
    },
    drug_licence_no: {
      type: String,
    },
    othertax: {
      type: String,
    },
    tax_name: {
      type: String,
    },
    number: {
      type: String,
    },
    bank_name: {
      type: String,
    },

    bank_addess: {
      type: String,
    },
    ifce_code: {
      type: String,
    },
    account_holder_name: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    upiId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", CompanySchema);
