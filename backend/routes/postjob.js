const express = require("express");
const router = express.Router();

// TODO JOBBOX DEVELOPER BY TRINH MINH HIEU
const {
  newPostjob,
  getPostjob,
  getSinglePostjob,
  getAdminPostjob,
  updatePostjob,
  deletePostjob,
  createPostjobReview,
  getPostjobReviews,
  deleteReview,
} = require("../controllers/postJobController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// NOTE Get all Postjob
router.route("/postjob").get(getPostjob);
// NOTE Get single Postjob
router.route("/postjob/:id").get(getSinglePostjob);
// NOTE Get all Postjob by Admin
router.route("/admin/postjob").get(getAdminPostjob);
// NOTE CREATE Postjob by Admin
router
  .route("/admin/postjob/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newPostjob);
// NOTE Update Postjob by Admin
router
  .route("/admin/postjob/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updatePostjob)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePostjob);

router.route("/review").put(isAuthenticatedUser, createPostjobReview);
router.route("/reviews").get(isAuthenticatedUser, getPostjobReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
