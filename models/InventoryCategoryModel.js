import mongoose from "mongoose";

const CategoryNameSchema = new mongoose.Schema(
  {
    CategoryName: {
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

export default mongoose.model("CategoryName", CategoryNameSchema);
