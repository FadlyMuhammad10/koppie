import mongoose from "mongoose";

const categoryModel = new mongoose.Schema(
  {
    name_category: {
      type: String,
      required: true,
    },
    menu_lists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", categoryModel);
