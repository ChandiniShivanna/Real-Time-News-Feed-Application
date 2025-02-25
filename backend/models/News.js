const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true, index: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, index: true },
});

NewsSchema.index({ views: -1, likes: -1 });

module.exports = mongoose.model("News", NewsSchema);
