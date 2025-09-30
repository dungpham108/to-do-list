import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("todoModels", TodoSchema);
