const Postjob = require("../models/postjob");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const postjob = require("../data/postjob");

// Setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

//npm run seeder

const seedPostjobs = async () => {
  try {
    // await Postjob.deleteMany();
    // console.log("Postjobs are deleted");

    await Postjob.insertMany(postjob);
    console.log("All Postjobs are insert in MongoDB Success.");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedPostjobs();
