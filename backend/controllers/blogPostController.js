// blog title *
// blog description *
// upload img

// NOTE JOBBOX DEVELOP BY TRINH MINH HIEU
const Blogpost = require("../models/blogpost");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");
const multer = require("multer");
const config = require("../../config"); // Đảm bảo thay đổi đường dẫn tới tệp config.js

// Khởi tạo middleware Multer
const storage = multer.memoryStorage(); // Lưu trữ hình ảnh trong bộ nhớ
const upload = multer({ storage: storage });

// TODO JOBBOX DEVELOP BY TRINH MINH HIEU @2023

exports.newUploadImgBlogpost = catchAsyncErrors(
  upload.single("image"), // 'image' là tên của trường file trong yêu cầu
  async (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Trích xuất các giá trị từ biến môi trường
    const s3AccessKeyId = config.S3_ACCESS_KEY_ID;
    const s3SecretAccessKey = config.S3_SECRET_ACCESS_KEY;
    const s3Endpoint = config.S3_ENDPOINT;
    const s3Bucket = config.S3_BUCKET;
    const s3Region = config.S3_REGION;

    // Cấu hình AWS SDK với khóa bí mật và khóa truy cập
    AWS.config.update({
      accessKeyId: s3AccessKeyId,
      secretAccessKey: s3SecretAccessKey,
    });

    // Tạo đối tượng S3
    const s3 = new AWS.S3({
      endpoint: s3Endpoint,
      region: s3Region,
    });

    // Tải hình ảnh lên S3 và lấy URL
    const { buffer, originalname } = req.file;
    const newFileName =
      Date.now() +
      "-" +
      crypto.randomBytes(8).toString("hex") +
      "-" +
      originalname;
    const key = "smartcard/blogpost/" + newFileName;

    try {
      const params = {
        Bucket: s3Bucket,
        Key: key,
        Body: buffer,
        ACL: "public-read",
      };

      await s3.upload(params).promise();

      const imageUrl = `https://${s3Bucket}.${s3Region}.digitaloceanspaces.com/${key}`;

      return res.status(200).json({
        success: true,
        imageUrl: imageUrl,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload the image to S3",
      });
    }
  }
);

// [x] Create new Blogpost   =>   /api/v1/admin/blogpost/new
exports.newBlogpost = catchAsyncErrors(async (req, res, next) => {
  //   req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const blogpost = await Blogpost.create(req.body); // Create

  res.status(201).json({
    success: true,
    blogpost,
  });
});

//[x] NOTE Get all Blogpost   =>   /api/v1/vandidates?keyword=kelly
exports.getBlogpost = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const blogpostCount = await Blogpost.countDocuments();

  const apiFeatures = new APIFeatures(Blogpost.find(), req.query)
    .search()
    .filter();

  let blogpost = await apiFeatures.query;
  let filteredblogpostCount = blogpost.length;

  apiFeatures.pagination(resPerPage);
  blogpost = await apiFeatures.query;

  res.status(200).json({
    success: true,
    blogpostCount,
    resPerPage,
    filteredblogpostCount,
    blogpost,
  });
});

//NOTE //[x] Get all Blogpost (Admin)  =>   /api/v1/admin/blogpost
exports.getAdminBlogpost = catchAsyncErrors(async (req, res, next) => {
  const blogpost = await Blogpost.find();

  res.status(200).json({
    success: true,
    blogpost,
  });
});

//NOTE //[x] Get single Blogpost details   =>   /api/v1/blogpost/:id
exports.getSingleBlogpost = catchAsyncErrors(async (req, res, next) => {
  const blogpost = await Blogpost.findById(req.params.id);

  if (!blogpost) {
    return next(new ErrorHandler("Blogpost not found", 404));
  }

  res.status(200).json({
    success: true,
    blogpost,
  });
});

//NOTE Update Blogpost   =>   /api/v1/admin/blogpost/:id
exports.updateBlogpost = catchAsyncErrors(async (req, res, next) => {
  let blogpost = await Blogpost.findById(req.params.id);

  if (!blogpost) {
    return next(new ErrorHandler("Blogpost not found", 404));
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

  blogpost = await Blogpost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    blogpost,
  });
});

// Delete Blogpost   =>   /api/v1/admin/blogpost/:id
exports.deleteBlogpost = catchAsyncErrors(async (req, res, next) => {
  const blogpost = await Blogpost.findById(req.params.id);

  if (!blogpost) {
    return next(new ErrorHandler("Blogpost not found", 404));
  }

  // // Deleting images associated with the blogpost
  // for (let i = 0; i < blogpost.images.length; i++) {
  //   const result = await cloudinary.v2.uploader.destroy(
  //     blogpost.images[i].public_id
  //   );
  // }

  await blogpost.remove();

  res.status(200).json({
    success: true,
    message: "Blogpost is deleted.",
  });
});

//PENDING
// Create new review   =>   /api/v1/review
exports.createBlogpostReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const blogpost = await Blogpost.findById(blogpostId);

  const isReviewed = blogpost.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    blogpost.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    blogpost.reviews.push(review);
    blogpost.numOfReviews = blogpost.reviews.length;
  }

  blogpost.ratings =
    blogpost.reviews.reduce((acc, item) => item.rating + acc, 0) /
    blogpost.reviews.length;

  await blogpost.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get Blogpost Reviews   =>   /api/v1/reviews
exports.getBlogpostReviews = catchAsyncErrors(async (req, res, next) => {
  const blogpost = await Blogpost.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: blogpost.reviews,
  });
});

// Delete Blogpost Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const blogpost = await Blogpost.findById(req.query.blogpostId);

  console.log(blogpost);

  const reviews = blogpost.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    blogpost.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Blogpost.findByIdAndUpdate(
    req.query.blogpostId,
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
