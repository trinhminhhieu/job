const express = require("express");
const router = express.Router();

// TODO JOBBOX DEVELOPER BY TRINH MINH HIEU
const {
  newBlogpost,
  newUploadImgBlogpost,
  getBlogpost,
  getSingleBlogpost,
  getAdminBlogpost,
  updateBlogpost,
  deleteBlogpost,
  createBlogpostReview,
  getBlogpostReviews,
  deleteReview,
} = require("../controllers/blogPostController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// NOTE Get all Blogpost
router.route("/blogpost").get(getBlogpost);
// NOTE Get single Blogpost
router.route("/blogpost/:id").get(getSingleBlogpost);
// NOTE Get all Blogpost by Admin
router.route("/admin/blogpost").get(getAdminBlogpost);
// NOTE CREATE Blogpost by Admin
router
  .route("/admin/blogpost/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newBlogpost);

//UPLOAD S3 CLOUD
router
  .route("/admin/blogpost/uploadimg")
  .post(isAuthenticatedUser, newUploadImgBlogpost);

// NOTE Update Blogpost by Admin
router
  .route("/admin/blogpost/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBlogpost)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBlogpost);

router.route("/review").put(isAuthenticatedUser, createBlogpostReview);
router.route("/reviews").get(isAuthenticatedUser, getBlogpostReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
