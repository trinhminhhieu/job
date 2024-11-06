// Job title * - name
// job description * - description
// Job location - location
// Workplace type * -workplace
// Salary - salary
// Tags (optional) - tags
// uploadfile - file
const mongoose = require("mongoose");

// TODO JOBBOX DEVELOPER BY TRINH MINH HIEU 2023
const postjobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter post job name"],
    trim: true,
    maxLength: [200, "Post job name cannot exceed 200 characters"],
  },
  workplace: {
    type: String,
    required: [true, "Please select workplace for this post a job"],
    enum: {
      values: ["Remote", "Office"],
      message: "Please select correct workplace for post a job",
    },
  },
  location: {
    type: String,
    required: [true, "Please enter postjob location"],
    maxLength: [50, "location name cannot exceed 50 characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter postjob description"],
    maxLength: [5000, "Postjob description cannot exceed 5000 characters"],
  },
  salary: {
    type: Number,
    required: [true, "Please enter post a job Salary"],
    maxLength: [6, "Salary name cannot exceed 5 characters"],
    default: 0.0,
  },
  tags: {
    type: String,
    maxLength: [50, "Tags name cannot exceed 50 characters"],
    trim: true,
  },
  file: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Postjob", postjobSchema);
