// NameRecruiters;
// AddressRecruiters;
// RatingRecruiters;
// TotalJobRecruiters;
// imageRecruiters

// NOTE JOBBOX DEVELOP BY TRINH MINH HIEU
const Recruiters = require("../models/recruiters");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// TODO JOBBOX DEVELOP BY TRINH MINH HIEU @2023

// [x] Create new Recruiters   =>   /api/v1/admin/recruiters/new
exports.newRecruiters = catchAsyncErrors(async (req, res, next) => {
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

  const recruiters = await Recruiters.create(req.body); // Create

  res.status(201).json({
    success: true,
    recruiters,
  });
});

//[x] NOTE Get all recruiters   =>   /api/v1/recruiters?keyword=apple
exports.getRecruiters = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const recruitersCount = await Recruiters.countDocuments();

  const apiFeatures = new APIFeatures(Recruiters.find(), req.query)
    .search()
    .filter();

  let recruiters = await apiFeatures.query;
  let filteredrecruitersCount = recruiters.length;

  apiFeatures.pagination(resPerPage);
  recruiters = await apiFeatures.query;

  res.status(200).json({
    success: true,
    recruitersCount,
    resPerPage,
    filteredrecruitersCount,
    recruiters,
  });
});

//NOTE //[x] Get all Recruiters (Admin)  =>   /api/v1/admin/recruiters
exports.getAdminRecruiters = catchAsyncErrors(async (req, res, next) => {
  const recruiters = await Recruiters.find();

  res.status(200).json({
    success: true,
    recruiters,
  });
});

//NOTE //[x] Get single recruiters details   =>   /api/v1/recruiters/:id
exports.getSingleRecruiters = catchAsyncErrors(async (req, res, next) => {
  const recruiters = await Recruiters.findById(req.params.id);

  if (!recruiters) {
    return next(new ErrorHandler("Recruiters not found", 404));
  }

  res.status(200).json({
    success: true,
    recruiters,
  });
});

//NOTE Update Recruiters   =>   /api/v1/admin/recruiters/:id
exports.updateRecruiters = catchAsyncErrors(async (req, res, next) => {
  let recruiters = await Recruiters.findById(req.params.id);

  if (!recruiters) {
    return next(new ErrorHandler("recruiters not found", 404));
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

  recruiters = await Recruiters.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    recruiters,
  });
});

// Delete recruiters   =>   /api/v1/admin/recruiters/:id
exports.deleteRecruiters = catchAsyncErrors(async (req, res, next) => {
  const recruiters = await Recruiters.findById(req.params.id);

  if (!recruiters) {
    return next(new ErrorHandler("recruiters not found", 404));
  }

  // // Deleting images associated with the recruiters
  // for (let i = 0; i < recruiters.images.length; i++) {
  //   const result = await cloudinary.v2.uploader.destroy(
  //     recruiters.images[i].public_id
  //   );
  // }

  await recruiters.remove();

  res.status(200).json({
    success: true,
    message: "recruiters is deleted.",
  });
});

//PENDING
// Create new review   =>   /api/v1/review
exports.createRecruitersReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const recruiters = await Recruiters.findById(recruitersId);

  const isReviewed = recruiters.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    recruiters.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    recruiters.reviews.push(review);
    recruiters.numOfReviews = recruiters.reviews.length;
  }

  recruiters.ratings =
    recruiters.reviews.reduce((acc, item) => item.rating + acc, 0) /
    recruiters.reviews.length;

  await recruiters.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get recruiters Reviews   =>   /api/v1/reviews
exports.getRecruitersReviews = catchAsyncErrors(async (req, res, next) => {
  const recruiters = await Recruiters.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: recruiters.reviews,
  });
});

// Delete recruiters Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const recruiters = await Recruiters.findById(req.query.recruitersId);

  console.log(recruiters);

  const reviews = recruiters.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    recruiters.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Recruiters.findByIdAndUpdate(
    req.query.recruitersId,
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
