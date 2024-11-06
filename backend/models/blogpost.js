const mongoose = require("mongoose");
// Title;x
// Description; x
// image x

// TODO JOBBOX DEVELOPER BY TRINH MINH HIEU 2023
const blogpostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter post blog name"],
    trim: true,
    maxLength: [200, "Post blog name cannot exceed 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter blog post description"],
    maxLength: [30000, "Post blog description cannot exceed 5000 characters"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blogpost", blogpostSchema);
