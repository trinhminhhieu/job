const Contact = require("../models/contact");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.newContact = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const contact = await Contact.create(req.body); // Create

  res.status(201).json({
    success: true,
    contact,
  });
});
