// UploadAvater; -images
// FullName; - name
// Email; - email
// contactNumber; - phone
// websitePersonal; - linkWeb
// bio; - bio
// experience; - experience
// Education level; - education
// Languages - languages
// category - category
// Current Salary - currsalary
// Expected Salary - expsalary
// Country - country
// city - city
// Complete Address - address
// Find On Map - findonmap
// Latitude - latitude
// Longitude - longitude
// FacebookLink
// TwitterLink
// InstagramLink
// Skills - skills

const mongoose = require("mongoose");
// TODO JOBBOX DEVELOPER BY TRINH MINH HIEU 2023
const myprofilesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter full name"],
    trim: true,
    maxLength: [100, "Profile name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    // validate: [validator.isEmail, "Please enter valid email address"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter profile phone"],
    trim: true,
    maxLength: [50, "Phone cannot exceed 12 number"],
  },
  linkWeb: {
    type: String,
    required: [true, "Please enter linkWeb"],
    trim: true,
    maxLength: [200, "Profile linkWeb cannot exceed 200 characters"],
  },
  bio: {
    type: String,
    required: [true, "Please enter bio"],
    trim: true,
    maxLength: [20, "Profile bio cannot exceed 20 characters"],
  },
  experience: {
    type: Number,
    required: [true, "Please enter profile experience"],
    trim: true,
    maxLength: [2, "Experience cannot exceed 2 number"],
  },
  education: {
    type: String,
    required: [true, "Please enter profile education"],
    trim: true,
    maxLength: [20, "Education cannot exceed 20 number"],
  },
  languages: {
    type: String,
    required: [true, "Please enter profile languages"],
    trim: true,
    maxLength: [50, "Languages cannot exceed 50 number"],
  },
  category: {
    type: String,
    required: [true, "Please select category for this Profiles"],
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
      message: "Please select correct category for Profiles",
    },
  },
  currsalary: {
    type: Number,
    required: [true, "Please enter profile currsalary"],
    trim: true,
    maxLength: [5, "Currsalary cannot exceed 5 number"],
  },
  expsalary: {
    type: Number,
    required: [true, "Please enter profile expsalary"],
    trim: true,
    maxLength: [5, "Expsalary cannot exceed 5 number"],
  },
  country: {
    type: String,
    required: [true, "Please enter profiles country"],
    maxLength: [30, "country name cannot exceed 30 characters"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Please enter profiles city"],
    maxLength: [12, "city name cannot exceed 12 characters"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please enter profiles address"],
    maxLength: [100, "Address name cannot exceed 100 characters"],
    trim: true,
  },
  findonmap: {
    type: String,
    required: [true, "Please enter profiles findonmap"],
    maxLength: [100, "findonmap cannot exceed 100 characters"],
  },
  latitude: {
    type: Number,
    maxLength: [12, "latitude cannot exceed 12 number"],
  },
  longitude: {
    type: Number,
    maxLength: [12, "longitude cannot exceed 12 number"],
  },
  linkfacebook: {
    type: String,
    maxLength: [20, "linkfb name cannot exceed 20 characters"],
  },
  linktwitter: {
    type: String,
    maxLength: [20, "linktwitter name cannot exceed 20 characters"],
  },
  linkinstagram: {
    type: String,
    maxLength: [20, "linkinstagram name cannot exceed 20 characters"],
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

module.exports = mongoose.model("Myprofiles", myprofilesSchema);
