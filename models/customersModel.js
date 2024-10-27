import mongoose from "mongoose";

const coustomerSchema = new mongoose.Schema({
  name: {
    type: String,
   
  },
  address: {
    type: String,
   
  },
  state: {
    type: String,
   
  },
  country: {
    type: String,
   
  },
  pinCode: {
    type: String,
   
  },
  contact: {
    type: String,
   
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },

  bankName: {
    type: String,
   
  },
  bankAddress: {
    type: String,
  },
  ifscCode: {
    type: String,
   
  },
  accountHolderName: {
    type: String,
   
  },
  accountNumber: {
    type: String,
   
  },

  registrationType: {
    type: String,
   
  },
  gstin: {
    type: String,
  },

  openingBalance: {
    type: Number,
   
  },

  asOnDate:{
    type:String,
  },
  admin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
  }
}, {
  timestamps: true,
});

export default mongoose.model("customer", coustomerSchema);
