const express = require("express");
const router = express.Router();

// TODO JOBBOX DEVELOPER BY TRINH MINH HIEU
const { newContact } = require("../controllers/contactController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router
  .route("/admin/contact/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newContact);
// router.route("/contact/new").post(newContact);

module.exports = router;
