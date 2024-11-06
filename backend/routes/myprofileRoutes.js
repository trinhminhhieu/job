const express = require("express");
const router = express.Router();

// TODO JOBBOX DEVELOPER BY TRINH MINH HIEU
const {
  newMyprofiles,
  getMyprofiles,
  getSingleMyprofiles,
  getAdminMyprofiles,
  updateMyprofiles,
  deleteMyprofiles,
  createMyprofilesReview,
  getMyprofilesReviews,
  deleteReview,
} = require("../controllers/myProfileController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// NOTE Get all Myprofiles
router.route("/myprofiles").get(getMyprofiles);
// NOTE Get single Myprofiles
router.route("/myprofiles/:id").get(getSingleMyprofiles);
// NOTE Get all Myprofiles by Admin
router.route("/admin/myprofiles").get(getAdminMyprofiles);
// NOTE CREATE Myprofiles by Admin
router
  .route("/admin/myprofiles/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newMyprofiles);
// NOTE Update Myprofiles by Admin
router
  .route("/admin/myprofiles/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateMyprofiles)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteMyprofiles);

router.route("/review").put(isAuthenticatedUser, createMyprofilesReview);
router.route("/reviews").get(isAuthenticatedUser, getMyprofilesReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
