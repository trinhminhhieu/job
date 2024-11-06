const express = require("express");
const router = express.Router();

// TODO JOBBOX DEVELOPER BY TRINH MINH HIEU
const {
  newCandidates,
  getCandidates,
  getSingleCandidates,
  getAdminCandidates,
  updateCandidates,
  deleteCandidates,
  createCandidatesReview,
  getCandidatesReviews,
  deleteReview,
} = require("../controllers/candidatesController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// NOTE Get all Candidates
router.route("/candidates").get(getCandidates);
// NOTE Get single Candidates
router.route("/candidates/:id").get(getSingleCandidates);
// NOTE Get all Candidates by Admin
router.route("/admin/candidates").get(getAdminCandidates);
// NOTE CREATE Candidates by Admin
router
  .route("/admin/candidates/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newCandidates);
// NOTE Update Candidates by Admin
router
  .route("/admin/candidates/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCandidates)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCandidates);

router.route("/review").put(isAuthenticatedUser, createCandidatesReview);
router.route("/reviews").get(isAuthenticatedUser, getCandidatesReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
