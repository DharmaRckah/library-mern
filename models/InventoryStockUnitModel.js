import mongoose from "mongoose";

const StockUnitSchema = new mongoose.Schema(
  {
    unitofquantity: {
      type: String,
    },
    symbol: {
      type: String,
    },
    formalName: {
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

export default mongoose.model("StockUnit", StockUnitSchema);
