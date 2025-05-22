import mongoose from "mongoose";

const DocSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Docs", DocSchema);
