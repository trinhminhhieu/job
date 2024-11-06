const mongoose = require("mongoose");

const recruitersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter recruiters name"],
    trim: true,
    maxLength: [100, "recruiters name cannot exceed 100 characters"],
  },
  address: {
    type: String,
    required: [true, "Please enter recruiters address"],
    maxLength: [95, "Address name cannot exceed 95 characters"],
    trim: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model("Recruiters", recruitersSchema);
