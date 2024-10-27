import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
     required:true,
    
  },
 admin:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"user",
   required:true,   
 },
  ifscCode:{
    type:String,
    required:true,
  },
  accountNumber:{
    type:String,
    required:true,
  },
  openingBalance:{
    type:String,
    required:true,
  },
  drCr: {
    type: String,
    enum: ['Dr', 'Cr'],
  }
}, {
  timestamps: true,
});

export default mongoose.model("Bank", bankSchema);
