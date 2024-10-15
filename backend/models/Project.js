const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    client: { type: String, required: true },
    completed: { type: String, required: true },
    size: { type: String, required: true },
    images: [{ type: String, required: true }],
    mainImage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
