import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    BrandName: {
      type: String,
    },
    manufacturerName: {
      type: String,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Brand", BrandSchema);
