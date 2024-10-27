import mongoose from "mongoose";

const cashSchema = new mongoose.Schema({
  name: {
    type: String  
  },
  drCr: {
    type: String,
    enum: ['Dr', 'Cr'],
  },

  openingBalance:{
    type:String,
  },
  admin:{type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
  }
}, {
  timestamps: true,
});

export default mongoose.model("Cash", cashSchema);
