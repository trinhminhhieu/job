// UploadAvater; -image
// FullName;
// Email;
// contactNumber;
// websitePersonal;
// bio;
// experience;
// Education;
// languae
// category
// Current Salary
// Expected Salary
// Country
// city
// Complete Address
// Find On Map
// Latitude
// Longitude
// FacebookLink
// TwitterLink
// InstagramLink
// Skills
// Job title *
// job description *
// Job location
// Workplace type *
// Salary
// Tags (optional)
// uploadfile

// NOTE JOBBOX DEVELOP BY TRINH MINH HIEU
const Myprofiles = require("../models/myprofiles");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// TODO JOBBOX DEVELOP BY TRINH MINH HIEU @2023

// [x] Create new Myprofiles   =>   /api/v1/admin/myprofiles/new
exports.newMyprofiles = catchAsyncErrors(async (req, res, next) => {
  //   let images = [];
  //   if (typeof req.body.images === "string") {
  //     images.push(req.body.images);
  //   } else {
  //     images = req.body.images;
  //   }

  //   let imagesLinks = [];

  //   for (let i = 0; i < images.length; i++) {
  //     const result = await cloudinary.v2.uploader.upload(images[i], {
  //       folder: "recruiters",
  //     });

  //     imagesLinks.push({
  //       public_id: result.public_id,
  //       url: result.secure_url,
  //     });
  //   }

  //   req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const myprofiles = await Myprofiles.create(req.body); // Create

  res.status(201).json({
    success: true,
    myprofiles,
  });
});

//[x] NOTE Get all Myprofiles   =>   /api/v1/vandidates?keyword=kelly
exports.getMyprofiles = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const myprofilesCount = await Myprofiles.countDocuments();

  const apiFeatures = new APIFeatures(Myprofiles.find(), req.query)
    .search()
    .filter();

  let myprofiles = await apiFeatures.query;
  let filteredmyprofilesCount = myprofiles.length;

  apiFeatures.pagination(resPerPage);
  myprofiles = await apiFeatures.query;

  res.status(200).json({
    success: true,
    myprofilesCount,
    resPerPage,
    filteredmyprofilesCount,
    myprofiles,
  });
});

//NOTE //[x] Get all Myprofiles (Admin)  =>   /api/v1/admin/myprofiles
exports.getAdminMyprofiles = catchAsyncErrors(async (req, res, next) => {
  const myprofiles = await Myprofiles.find();

  res.status(200).json({
    success: true,
    myprofiles,
  });
});

//NOTE //[x] Get single Myprofiles details   =>   /api/v1/myprofiles/:id
exports.getSingleMyprofiles = catchAsyncErrors(async (req, res, next) => {
  const myprofiles = await Myprofiles.findById(req.params.id);

  if (!myprofiles) {
    return next(new ErrorHandler("Myprofiles not found", 404));
  }

  res.status(200).json({
    success: true,
    myprofiles,
  });
});

//NOTE Update Myprofiles   =>   /api/v1/admin/myprofiles/:id
exports.updateMyprofiles = catchAsyncErrors(async (req, res, next) => {
  let myprofiles = await Myprofiles.findById(req.params.id);

  if (!myprofiles) {
    return next(new ErrorHandler("Myprofiles not found", 404));
  }

  // let images = [];
  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  // if (images !== undefined) {
  //   // Deleting images associated with the product
  //   for (let i = 0; i < product.images.length; i++) {
  //     const result = await cloudinary.v2.uploader.destroy(
  //       product.images[i].public_id
  //     );
  //   }

  //   let imagesLinks = [];

  //   for (let i = 0; i < images.length; i++) {
  //     const result = await cloudinary.v2.uploader.upload(images[i], {
  //       folder: "products",
  //     });

  //     imagesLinks.push({
  //       public_id: result.public_id,
  //       url: result.secure_url,
  //     });
  //   }

  //   req.body.images = imagesLinks;
  // }

  myprofiles = await Myprofiles.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    myprofiles,
  });
});

// Delete Myprofiles   =>   /api/v1/admin/myprofiles/:id
exports.deleteMyprofiles = catchAsyncErrors(async (req, res, next) => {
  const myprofiles = await Myprofiles.findById(req.params.id);

  if (!myprofiles) {
    return next(new ErrorHandler("Myprofiles not found", 404));
  }

  // // Deleting images associated with the myprofiles
  // for (let i = 0; i < myprofiles.images.length; i++) {
  //   const result = await cloudinary.v2.uploader.destroy(
  //     myprofiles.images[i].public_id
  //   );
  // }

  await myprofiles.remove();

  res.status(200).json({
    success: true,
    message: "Myprofiles is deleted.",
  });
});

//PENDING
// Create new review   =>   /api/v1/review
exports.createMyprofilesReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const myprofiles = await Myprofiles.findById(myprofilesId);

  const isReviewed = myprofiles.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    myprofiles.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    myprofiles.reviews.push(review);
    myprofiles.numOfReviews = myprofiles.reviews.length;
  }

  myprofiles.ratings =
    myprofiles.reviews.reduce((acc, item) => item.rating + acc, 0) /
    myprofiles.reviews.length;

  await myprofiles.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get Myprofiles Reviews   =>   /api/v1/reviews
exports.getMyprofilesReviews = catchAsyncErrors(async (req, res, next) => {
  const myprofiles = await Myprofiles.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: myprofiles.reviews,
  });
});

// Delete Myprofiles Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const myprofiles = await Myprofiles.findById(req.query.myprofilesId);

  console.log(myprofiles);

  const reviews = myprofiles.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    myprofiles.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Myprofiles.findByIdAndUpdate(
    req.query.myprofilesId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
