const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

const errorMiddleware = require("./middlewares/errors");

var cors = require("cors"); //NOTE THEM CORS VÀO NODE JS ĐỂ FONTEND CÓ THỂ KẾT NỐI VỚI BE
app.use(cors());
// Setting up config file chayj khi thu nghiem hoan tat
// if (process.env.NODE_ENV !== "PRODUCTION")
//   require("dotenv").config({ path: "backend/config/config.env" });
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload()); //NOTE add {useTempFiles: true}

// Import all routes
const products = require("./routes/product");
const recruiters = require("./routes/recruitersRoutes");
const candidates = require("./routes/candidatesRoutes");
const postjob = require("./routes/postjob");
const myprofiles = require("./routes/myprofileRoutes");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");
const blogpost = require("./routes/blogpostRoutes");
const contact = require("./routes/contactRoutes");

app.use("/api/v1", products);
app.use("/api/v1", recruiters); // NOTE recruiters
app.use("/api/v1", candidates); // NOTE candidates
app.use("/api/v1", postjob); // NOTE postjob
app.use("/api/v1", myprofiles); // NOTE myprofiles
app.use("/api/v1", blogpost); // NOTE blogpost
app.use("/api/v1", contact); // NOTE contact

app.use("/api/v1", auth);
app.use("/api/v1", payment);
app.use("/api/v1", order);

// if (process.env.NODE_ENV === "PRODUCTION") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   });
// }

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
