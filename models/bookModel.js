import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Issued"],
      default: "Available", // Default status when a book is added
    },
    issuedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema for the student who borrowed the book
      default: null,
    },
    issueDate: {
      type: Date,
      default: null, // Null by default; set only when the book is issued
    },
    returnDate: {
      type: Date,
      default: null, // Null by default; set when book is returned
    },
    userName: {
      type: String,
      default: null, // Null by default; set when book is returned
    },
    contact: {
      type: String,
      default: null, // Null by default; set when book is returned
    },
    img: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
