const mongoose = require("mongoose");

// Create Schema
const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

mongoose.model("ideas", IdeaSchema);
