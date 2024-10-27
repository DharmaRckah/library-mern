import mongoose from "mongoose";

const ManufacturerSchema = new mongoose.Schema(
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

    asOnDate: {
      type: String,
    },
    admin:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("manufacturer", ManufacturerSchema);
