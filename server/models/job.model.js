const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  requiredSkills: [String],
  skillScoreThreshold: { type: Number, default: 0 },
  jobTags: [String], // e.g., ["remote", "frontend", "internship"]
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
