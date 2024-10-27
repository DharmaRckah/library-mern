import mongoose from "mongoose";

const BranchesSchema = new mongoose.Schema(
  {
    branchName: {
      type: String,
    },
    branchId: {
      type: String,
    },
    location: {
      type: String,
    },
    address: {
      type: String,
    },
    contact: {
      type: String,
    },
    emailId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Branches", BranchesSchema);
