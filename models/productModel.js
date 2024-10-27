import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  itemCode: { type: String },
  productName: { type: String },
  category: { type: String },
  subCategory: { type: String },
  manufacturer: { type: String },
  brand: { type: String },
  subBrand: { type: String },
  unit: { type: String },
  hsnCode: { type: String },
  gstRate: { type: String },
  cess: { type: String },
  purchaseTaxInclude: { type: Boolean },
  salesTaxInclude: { type: Boolean },
  img: [
    {
      type: String,
    },
  ],
  description: { type: String },
  newWeight: { type: String },
  batchNo: { type: String },
  expiryDate: { type: String },
  feature: { type: String },
  minimumStock: { type: Number },
  maximumStock: { type: Number },
  purchasePriceExGst: { type: String },
  purchasePriceInGst: { type: String },
  maxmimunRetailPrice: { type: String },
  retailDiscount: { type: Number },
  retailPrice: { type: String },
  retailMargin: { type: String },
  wholesalerDiscount: { type: String },
  wholesalerPrice: { type: String },
  wholesaleMargin: { type: String },


  quantity: { type: String },
  rate: { type: String },
  units: { type: String },
  amount: { type: String },
  admin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
  },

  rows: [
    {
      variant: String,
      productCode: String,
      productName: String,
      purchasePrice: Number,
      landingCost: Number,
      mrp: Number,
      retailDiscount: Number,
      retailPrice: Number,
      retailMargin: Number,
      wholesalerDiscount: Number,
      wholesalerPrice: Number,
      wholesaleMargin: Number,
      minimumStock: Number,
      maximumStock: Number,
      openingQty: Number,
    },
  ],
});

export default mongoose.model("product", productSchema);
