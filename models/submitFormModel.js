import mongoose from "mongoose";

const FormSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
        type: String,
        required: true,
      },
    email: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        required: true,
      },
    message: {
      type: String,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("FormSubmission", FormSubmissionSchema);