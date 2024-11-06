//Candidates - Ứng viên controller
// Name;
// Skills;
// Star;
// Description;
// Tag;
// Address;
// Price;
// image

// NOTE JOBBOX DEVELOP BY TRINH MINH HIEU
const Candidates = require("../models/candidates");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// TODO JOBBOX DEVELOP BY TRINH MINH HIEU @2023

// [x] Create new Candidates   =>   /api/v1/admin/candidates/new
exports.newCandidates = catchAsyncErrors(async (req, res, next) => {
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

  const candidates = await Candidates.create(req.body); // Create

  res.status(201).json({
    success: true,
    candidates,
  });
});

//[x] NOTE Get all Candidates   =>   /api/v1/vandidates?keyword=kelly
exports.getCandidates = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const candidatesCount = await Candidates.countDocuments();

  const apiFeatures = new APIFeatures(Candidates.find(), req.query)
    .search()
    .filter();

  let candidates = await apiFeatures.query;
  let filteredcandidatesCount = candidates.length;

  apiFeatures.pagination(resPerPage);
  candidates = await apiFeatures.query;

  res.status(200).json({
    success: true,
    candidatesCount,
    resPerPage,
    filteredcandidatesCount,
    candidates,
  });
});

//NOTE Get all Candidates (Admin)  =>   /api/v1/admin/candidates
exports.getAdminCandidates = catchAsyncErrors(async (req, res, next) => {
  const candidates = await Candidates.find();

  res.status(200).json({
    success: true,
    candidates,
  });
});

//NOTE //[x] Get single Candidates details   =>   /api/v1/candidates/:id
exports.getSingleCandidates = catchAsyncErrors(async (req, res, next) => {
  const candidates = await Candidates.findById(req.params.id);

  if (!candidates) {
    return next(new ErrorHandler("Candidates not found", 404));
  }

  res.status(200).json({
    success: true,
    candidates,
  });
});

//NOTE Update Candidates   =>   /api/v1/admin/candidates/:id
exports.updateCandidates = catchAsyncErrors(async (req, res, next) => {
  let candidates = await Candidates.findById(req.params.id);

  if (!candidates) {
    return next(new ErrorHandler("Candidates not found", 404));
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

  candidates = await Candidates.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    candidates,
  });
});

// Delete Candidates   =>   /api/v1/admin/candidates/:id
exports.deleteCandidates = catchAsyncErrors(async (req, res, next) => {
  const candidates = await Candidates.findById(req.params.id);

  if (!candidates) {
    return next(new ErrorHandler("Candidates not found", 404));
  }

  // // Deleting images associated with the candidates
  // for (let i = 0; i < candidates.images.length; i++) {
  //   const result = await cloudinary.v2.uploader.destroy(
  //     candidates.images[i].public_id
  //   );
  // }

  await candidates.remove();

  res.status(200).json({
    success: true,
    message: "Candidates is deleted.",
  });
});

//PENDING
// Create new review   =>   /api/v1/review
exports.createCandidatesReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const candidates = await Candidates.findById(candidatesId);

  const isReviewed = candidates.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    candidates.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    candidates.reviews.push(review);
    candidates.numOfReviews = candidates.reviews.length;
  }

  candidates.ratings =
    candidates.reviews.reduce((acc, item) => item.rating + acc, 0) /
    candidates.reviews.length;

  await candidates.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get Candidates Reviews   =>   /api/v1/reviews
exports.getCandidatesReviews = catchAsyncErrors(async (req, res, next) => {
  const candidates = await Candidates.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: candidates.reviews,
  });
});

// Delete candidates Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const candidates = await Candidates.findById(req.query.candidatesId);

  console.log(candidates);

  const reviews = candidates.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    candidates.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Candidates.findByIdAndUpdate(
    req.query.candidatesId,
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
