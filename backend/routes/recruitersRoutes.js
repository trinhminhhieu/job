const express = require("express");
const router = express.Router();

// TODO JOBBOX DEVELOPER BY TRINH MINH HIEU
const {
  newRecruiters,
  getRecruiters,
  getSingleRecruiters,
  getAdminRecruiters,
  updateRecruiters,
  deleteRecruiters,
  createRecruitersReview,
  getRecruitersReviews,
  deleteReview,
} = require("../controllers/recruitersController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// NOTE Get all Recruiters
router.route("/recruiters").get(getRecruiters);
// NOTE Get single Recruiters
router.route("/recruiters/:id").get(getSingleRecruiters);
// NOTE Get all Recruiters by Admin
router.route("/admin/recruiters").get(getAdminRecruiters);
// NOTE CREATE Recruiters
router
  .route("/admin/recruiters/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newRecruiters);
// NOTE Update Recruiters
router
  .route("/admin/recruiters/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateRecruiters)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteRecruiters);

router.route("/review").put(isAuthenticatedUser, createRecruitersReview);
router.route("/reviews").get(isAuthenticatedUser, getRecruitersReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
