// config.js
const dotenv = require("dotenv");

// Nạp biến môi trường từ tệp .env
dotenv.config();

// Trích xuất các biến môi trường bạn cần
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
const S3_ENDPOINT = process.env.S3_ENDPOINT;
const S3_BUCKET = process.env.S3_BUCKET;
const S3_REGION = process.env.S3_REGION;
const S3_MAX_FILE_SIZE = process.env.S3_MAX_FILE_SIZE;

module.exports = {
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
  S3_ENDPOINT,
  S3_BUCKET,
  S3_REGION,
  S3_MAX_FILE_SIZE,
};
