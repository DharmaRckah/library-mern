import mongoose from "mongoose";

const SubBrandNameSchema = new mongoose.Schema(
  {
    BrandName: {
      type: String,
    },
    SubBrandName: {
      type: String,
    },
    manufacturerName: {
      type: String,
    },
    admin:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
      requried:true,
    }
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("SubBrand", SubBrandNameSchema);
