import mongoose from "mongoose";

const studentPaymentSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: { type: String },
  fatherName: { type: String },
  contact: { type: String },
  email: { type: String },
  address: { type: String },
  pincode: { type: String },
  state: { type: String },
  paymentDate: { type: Date },
  paymentMethod: { type: String },
  amount: { type: Number },
  img: [
    {
      type: String,
    },
  ],
  description: { type: String },
});

export default mongoose.model("studentPayment", studentPaymentSchema);
