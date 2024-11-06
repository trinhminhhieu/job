// Job title *
// job description *
// Job location
// Workplace type *
// Salary
// Tags (optional)
// uploadfile

// NOTE JOBBOX DEVELOP BY TRINH MINH HIEU
const Postjob = require("../models/postjob");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// TODO JOBBOX DEVELOP BY TRINH MINH HIEU @2023

// [x] Create new Postjob   =>   /api/v1/admin/postjob/new
exports.newPostjob = catchAsyncErrors(async (req, res, next) => {
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

  const postjob = await Postjob.create(req.body); // Create

  res.status(201).json({
    success: true,
    postjob,
  });
});

//[x] NOTE Get all Postjob   =>   /api/v1/vandidates?keyword=kelly
exports.getPostjob = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const postjobCount = await Postjob.countDocuments();

  const apiFeatures = new APIFeatures(Postjob.find(), req.query)
    .search()
    .filter();

  let postjob = await apiFeatures.query;
  let filteredpostjobCount = postjob.length;

  apiFeatures.pagination(resPerPage);
  postjob = await apiFeatures.query;

  res.status(200).json({
    success: true,
    postjobCount,
    resPerPage,
    filteredpostjobCount,
    postjob,
  });
});

//NOTE //[x] Get all Postjob (Admin)  =>   /api/v1/admin/postjob
exports.getAdminPostjob = catchAsyncErrors(async (req, res, next) => {
  const postjob = await Postjob.find();

  res.status(200).json({
    success: true,
    postjob,
  });
});

//NOTE //[x] Get single Postjob details   =>   /api/v1/postjob/:id
exports.getSinglePostjob = catchAsyncErrors(async (req, res, next) => {
  const postjob = await Postjob.findById(req.params.id);

  if (!postjob) {
    return next(new ErrorHandler("Postjob not found", 404));
  }

  res.status(200).json({
    success: true,
    postjob,
  });
});

//NOTE Update Postjob   =>   /api/v1/admin/postjob/:id
exports.updatePostjob = catchAsyncErrors(async (req, res, next) => {
  let postjob = await Postjob.findById(req.params.id);

  if (!postjob) {
    return next(new ErrorHandler("Postjob not found", 404));
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

  postjob = await Postjob.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    postjob,
  });
});

// Delete Postjob   =>   /api/v1/admin/postjob/:id
exports.deletePostjob = catchAsyncErrors(async (req, res, next) => {
  const postjob = await Postjob.findById(req.params.id);

  if (!postjob) {
    return next(new ErrorHandler("Postjob not found", 404));
  }

  // // Deleting images associated with the postjob
  // for (let i = 0; i < postjob.images.length; i++) {
  //   const result = await cloudinary.v2.uploader.destroy(
  //     postjob.images[i].public_id
  //   );
  // }

  await postjob.remove();

  res.status(200).json({
    success: true,
    message: "Postjob is deleted.",
  });
});

//PENDING
// Create new review   =>   /api/v1/review
exports.createPostjobReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const postjob = await Postjob.findById(postjobId);

  const isReviewed = postjob.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    postjob.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    postjob.reviews.push(review);
    postjob.numOfReviews = postjob.reviews.length;
  }

  postjob.ratings =
    postjob.reviews.reduce((acc, item) => item.rating + acc, 0) /
    postjob.reviews.length;

  await postjob.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get Postjob Reviews   =>   /api/v1/reviews
exports.getPostjobReviews = catchAsyncErrors(async (req, res, next) => {
  const postjob = await Postjob.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: postjob.reviews,
  });
});

// Delete Postjob Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const postjob = await Postjob.findById(req.query.postjobId);

  console.log(postjob);

  const reviews = postjob.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    postjob.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Postjob.findByIdAndUpdate(
    req.query.postjobId,
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
