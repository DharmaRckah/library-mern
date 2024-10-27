import mongoose from "mongoose";

const autherNameSchema = new mongoose.Schema(
  {
    autherName: {
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

export default mongoose.model("autherName", autherNameSchema);
