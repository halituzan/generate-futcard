import mongoose from "mongoose";
const Schema = mongoose.Schema;
const gallerySchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  fileName: {
    type: String,
  },
  title: {
    type: String,
    default: "",
  },
});

const Galleries =
  mongoose.models?.Galleries || mongoose.model("Galleries", gallerySchema);

export default Galleries;
