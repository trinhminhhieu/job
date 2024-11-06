const mongoose = require("mongoose");
// Name;x
// Major; x
// Rating; x
// Description; x
// Skills; x
// Address; x
// Price; x
// image x
// TODO JOBBOX DEVELOPER BY TRINH MINH HIEU 2023
const candidatesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter candidates name"],
    trim: true,
    maxLength: [100, "Candidates name cannot exceed 100 characters"],
  },
  major: {
    type: String,
    required: [true, "Please enter candidates major"],
    trim: true,
    maxLength: [50, "Candidates major cannot exceed 50 characters"],
  },
  skills: {
    type: String,
    required: [true, "Please select skills for this candidates"],
    enum: {
      values: [
        "Figma",
        "Ui/Ux",
        "Web developer",
        "Mobile developer",
        "Game developer",
        "Graphic design",
        "Adobe",
        "Photoshop",
        "Logo Design",
        "Marketing",
        "SEO",
        "Writting",
        "Affiliate",
      ],
      message: "Please select correct skills for candidates",
    },
  },
  address: {
    type: String,
    required: [true, "Please enter candidates address"],
    maxLength: [95, "Address name cannot exceed 95 characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter candidates description"],
    maxLength: [5000, "Candidates description cannot exceed 5000 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Please enter candidates price"],
    maxLength: [5, "candidates name cannot exceed 5 characters"],
    default: 0.0,
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

module.exports = mongoose.model("Candidates", candidatesSchema);
